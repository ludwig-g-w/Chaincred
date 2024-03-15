import { EAS_GRAPHQL, SCHEMA_ADRESS_ACTION, SCHEMA_ADRESS_REVIEW } from "@env";
import { getSdk } from "@generated/graphql"; // Adjust the import path according to where your generated code is
import { decodeDataReviewOrAction } from "@utils/eas";
import { ExpoRequest, ExpoResponse } from "expo-router/server";
import { GraphQLClient } from "graphql-request";
import { getUser } from "../auth/[...thirdweb]+api";

const client = new GraphQLClient(EAS_GRAPHQL);
const sdk = getSdk(client);

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

  console.log({ recipients });

  try {
    const res = await sdk.Attestations({
      where: {
        OR: [
          { recipient: { in: recipients } },
          { attester: { in: attesters } },
        ],
        schemaId: {
          in: [SCHEMA_ADRESS_ACTION, SCHEMA_ADRESS_REVIEW],
        },
      },
    });

    return ExpoResponse.json(res.attestations.map(decodeDataReviewOrAction));
  } catch (error) {
    return new ExpoResponse("EAS problem", {
      status: 500,
    });
  }
};
