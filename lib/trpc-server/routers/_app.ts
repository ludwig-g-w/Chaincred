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
import { FindManyProfileInput, ProfileSelect } from "./zod";
// TODO: ENV VAR move to .env when it works on server
const EAS_ADDRESS_REVIEW =
  "0xcddb22d1ae4a241838b7f8b7a9063ee955e0e2632320cb1c41c1ee1ab61e70ef";

export const appRouter = router({
  isLoggedIn: openProcedure.input(z.string()).query(async ({ input }) => {
    const authResult = await thirdwebAuth.verifyJWT({ jwt: input });
    return authResult.valid;
  }),
  generatePayload: openProcedure
    .input(z.object({ address: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await thirdwebAuth.generatePayload({
        address: input.address,
      });
      return payload;
    }),
  verifyLoginPayload: openProcedure
    .input(z.unknown())
    .mutation(async ({ input }) => {
      try {
        const payload = input as VerifyLoginPayloadParams;
        const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
        if (verifiedPayload.valid) {
          const jwt = await thirdwebAuth.generateJWT({
            payload: verifiedPayload.payload,
          });
          return jwt;
        }

        new TRPCError({
          code: "UNAUTHORIZED",
        });
      } catch (error) {
        new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: JSON.stringify(error),
        });
      }
    }),

  attestations: protectedProcedure
    .input(
      z.object({
        recipients: z.array(z.string()).optional(),
        attesters: z.array(z.string()).optional(),
        select: ProfileSelect,
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.recipients?.length && !input.attesters?.length) {
        return [];
      }

      const { attesters = [], recipients = [], select } = input;
      try {
        const responseAttestations = await sdk.Attestations({
          where: {
            OR: [
              {
                recipient: {
                  // TODO: there is a bug of case sensitivity of this value
                  equals: "0x3279698b8A6CC5924bD19170137a4d4C5B002021",
                },
              },
              { attester: { equals: attesters[0].toUpperCase() } },
            ],
            schemaId: {
              in: [EAS_ADDRESS_REVIEW],
            },
          },
        });
        const addresses = new Set(
          responseAttestations.attestations.flatMap((a) => [
            a.attester,
            a.recipient,
          ])
        );
        const profiles = await getProfilesByAddresses(
          Array.from(addresses),
          select
        );

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
    .input(
      z.object({
        address: z.string().min(1),
        select: ProfileSelect,
      })
    )
    .query(async ({ ctx, input }) => {
      const profile = await getProfileByAddress(input.address, input.select);
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
    .input(
      z.object({
        addresses: z.array(z.string()).optional(),
        select: ProfileSelect,
      })
    )
    .query(async ({ ctx, input }) => {
      const profiles = input.addresses
        ? await getProfilesByAddresses(input.addresses, input.select)
        : await getAllProfiles(input.select);

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
