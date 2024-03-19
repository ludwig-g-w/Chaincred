import { SCHEMA_ADRESS_REVIEW } from "@env";
import { sdk } from "@lib/graphql/client";
import { getAllProfiles, getProfilesByAddresses } from "@services/db/prisma";
import { TRPCError, inferProcedureOutput } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { decodeDataReviewOrAction } from "@utils/eas";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { getProfileByAddress, setOrModifyProfile } from "@services/db/prisma";

export const appRouter = router({
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
        const [profiles, responseAttestations] = await Promise.all([
          getProfilesByAddresses([...recipients, ...attesters]),
          sdk.Attestations({
            where: {
              OR: [
                { recipient: { in: recipients } },
                { attester: { in: attesters } },
              ],
              schemaId: {
                in: [SCHEMA_ADRESS_REVIEW],
              },
            },
          }),
        ]);

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
      console.log({ profile });
      return profile;
    }),
  setOrModifyProfile: protectedProcedure
    .input(
      z.object({
        address: z.string().min(10),
        title: z.string().optional(),
        imageUrl: z.string().optional(),
        description: z.string().optional(),
        location: z.object({
          coords: z.string().optional(),
          name: z.string().optional(),
        }),
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
});

export type AppRouter = typeof appRouter;
export type Attestation = inferProcedureOutput<
  AppRouter["attestations"]
>[number];

export { trpcNext };
