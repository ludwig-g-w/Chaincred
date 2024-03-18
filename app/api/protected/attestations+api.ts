import { EAS_GRAPHQL, SCHEMA_ADRESS_REVIEW } from "@env";
import { getSdk } from "@generated/graphql"; // Adjust the import path according to where your generated code is
import { getProfilesByAddresses } from "@services/db/prisma";
import { decodeDataReviewOrAction } from "@utils/eas";
import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { GraphQLClient } from "graphql-request";
import { getUser } from "../auth/[...thirdweb]+api";
import { sdk } from "@lib/graphql/client";

export const GET = async (req: ExpoRequest) => {
  const user = await getUser(req);
  if (!user) {
    return new ExpoResponse("Not authorized.", {
      status: 401,
    });
  }

  const { searchParams } = new URL(req.url);
  const recipients =
    searchParams
      .get("recipientAddresses")
      ?.split(",")
      ?.map((s) => s.trim()) ?? [];
  const attesters =
    searchParams
      .get("attesterAddresses")
      ?.split(",")
      ?.map((s) => s.trim()) ?? [];

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

    return ExpoResponse.json(formattedAttestation);
  } catch (error) {
    return new ExpoResponse(`EAS problem ${error}`, {
      status: 500,
    });
  }
};
