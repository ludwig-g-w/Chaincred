import { SCHEMA_ADRESS_REVIEW } from "@env";
import { sdk } from "@lib/graphql/client";
import { getProfilesByAddresses } from "@services/db/prisma";
import { TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { decodeDataReviewOrAction } from "@utils/eas";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  attestations: procedure
    .input(
      z.object({
        recipients: z.array(z.string()),
        attesters: z.array(z.string()),
      })
    )
    .query(async ({ input, ctx }) => {
      const { attesters, recipients } = input;
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

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
  profile: procedure.query(async ({ ctx }) => {
    return "hello";
  }),
});

export type AppRouter = typeof appRouter;
export { trpcNext };
