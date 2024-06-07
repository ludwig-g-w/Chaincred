import { sdk } from "@lib/graphql/client";
import {
  getAllProfiles,
  getProfileByAddress,
  getProfilesByAddresses,
  setOrModifyProfile,
} from "@lib/services/db/functions";
import prisma from "@lib/services/db/prismaClient";
import { thirdwebAuth } from "@lib/services/thirdwebAuth";
import { TRPCError, inferProcedureOutput } from "@trpc/server";
import { decodeDataReviewOrAction } from "@utils/eas";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { z } from "zod";
import { openProcedure, protectedProcedure, router } from "../trpc";
import { FindManyProfileInput } from "./zod";
// TODO: ENV VAR move to .env when it works on server
const EXPO_PUBLIC_SCHEMA_ADRESS_REVIEW =
  "0xba299dc0f2f0caf692628b8bcb62037763e865804462c85b8adcf7ef7b8beb53";

export const appRouter = router({
  verifyLoginPayload: openProcedure
    .input(z.unknown())
    .mutation(async ({ input }) => {
      const payload: VerifyLoginPayloadParams =
        input as VerifyLoginPayloadParams;
      const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

      if (verifiedPayload.valid) {
        const jwt = await thirdwebAuth.generateJWT({
          payload: verifiedPayload.payload,
        });
        return jwt;
      }

      return new TRPCError({
        code: "UNAUTHORIZED",
      });
    }),
  login: openProcedure
    .input(
      z.object({
        address: z.string(),
        chainId: z.string(),
      })
    )
    .query(async ({ input: { address, chainId } }) => {
      if (!address) {
        Error;
      }

      return await thirdwebAuth.generatePayload({
        address,
        chainId: chainId ? parseInt(chainId) : undefined,
      });
    }),
  attestations: protectedProcedure
    .input(
      z.object({
        recipients: z.array(z.string()).optional(),
        attesters: z.array(z.string()).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { attesters = [], recipients = [] } = input;
      try {
        const responseAttestations = await sdk.Attestations({
          where: {
            OR: [
              { recipient: { in: recipients } },
              { attester: { in: attesters } },
            ],
            schemaId: {
              in: [EXPO_PUBLIC_SCHEMA_ADRESS_REVIEW],
            },
          },
        });
        const addresses = new Set(
          responseAttestations.attestations.flatMap((a) => [
            a.attester,
            a.recipient,
          ])
        );
        const profiles = await getProfilesByAddresses(Array.from(addresses));

        const formattedAttestation = responseAttestations.attestations.map(
          (attestation) => {
            const attestWithDecodedData = decodeDataReviewOrAction(attestation);
            const attester = profiles.find(
              (profile) => profile.address === attestWithDecodedData.attester
            );
            const recipient = profiles.find(
              (profile) => profile.address === attestWithDecodedData.recipient
            );

            return {
              ...attestWithDecodedData,
              attester: attester ?? attestWithDecodedData.attester,
              recipient: recipient ?? attestWithDecodedData.recipient,
            };
          }
        );

        return formattedAttestation;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: JSON.stringify(error),
        });
      }
    }),
  getProfileByAddress: protectedProcedure
    .input(z.object({ address: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const profile = await getProfileByAddress(input.address);
      return profile;
    }),
  setOrModifyProfile: protectedProcedure
    .input(
      z.object({
        address: z.string().min(10),
        title: z.string().optional(),
        imageUrl: z.string().optional(),
        description: z.string().optional(),
        location: z
          .object({
            coords: z.string().optional(),
            name: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await setOrModifyProfile(input);
      return profile;
    }),
  getProfiles: protectedProcedure
    .input(z.array(z.string()).optional())
    .query(async ({ ctx, input: addresses }) => {
      const profiles = addresses
        ? await getProfilesByAddresses(addresses)
        : await getAllProfiles();

      return profiles;
    }),
  profiles: protectedProcedure
    .input(FindManyProfileInput)
    .query(async ({ input }) => {
      try {
        const res = await prisma.profile.findMany(input);
        return res ?? [];
      } catch (error) {
        console.log(error);
        return [];
      }
    }),
});

export type AppRouter = typeof appRouter;
export type Attestation = inferProcedureOutput<
  AppRouter["attestations"]
>[number];
