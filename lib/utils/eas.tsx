import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ListAttestationFragment } from "@generated/graphql"; // Adjust the import path according to where your generated code is
import { convertJsonToObject } from "@utils/attestations";
import { ReviewItem } from "@utils/types";
import { Account } from "thirdweb/wallets";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
import { thirdwebClient } from "@lib/services/thirdwebClient";
import { sepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
export const schemaEncoder = new SchemaEncoder(
  "string title,string description,string entityName,uint8 quantity"
);

// Not in use
export async function createActionAttestation({
  signer,
  title,
  description,
  address,
}) {
  const eas = new EAS(process.env.EXPO_PUBLIC_EAS_CONTRACT);
  // Signer must be an ethers-like signer.
  await eas.connect(signer as any);
  // Initialize SchemaEncoder with the schema string

  const encodedData = schemaEncoder.encodeData([
    { name: "title", value: title, type: "string" },
    {
      name: "description",
      value: description ?? "",
      type: "string",
    },
    { name: "entityName", value: "", type: "string" },
    { name: "quantity", value: "1", type: "uint8" },
  ]);

  const tx = await eas.attest({
    schema: process.env.EXPO_PUBLIC_SCHEMA_ADRESS_ACTION,
    data: {
      recipient: address,
      expirationTime: 0 as any,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  return await tx.wait();
}

export const schemaEncoderReview = new SchemaEncoder(
  "uint8 rating,string comment"
);
export async function createReviewAttestation({
  account,
  rating,
  comment,
  address,
}: {
  account: Account;
  rating?: number;
  comment?: string;
  address?: string;
}) {
  const eas = new EAS(process.env.EXPO_PUBLIC_EAS_CONTRACT);
  try {
    const ethersSigner = await ethers6Adapter.signer.toEthers({
      account,
      chain: sepolia,
      client: createThirdwebClient({
        clientId: "b1535b34b5222fc49bdf7394c152dc3e",
      }),
    });

    await eas.connect(ethersSigner);

    const encodedData = schemaEncoderReview.encodeData([
      { name: "rating", value: rating, type: "uint8" },
      { name: "comment", value: comment, type: "string" },
    ]);

    const tx = await eas.attest({
      schema: process.env.EXPO_PUBLIC_SCHEMA_ADRESS_REVIEW,
      data: {
        recipient: address!,
        expirationTime: 0 as any,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });

    return tx;
  } catch (error) {
    console.log(error);
  }
}
export const decodeDataReviewOrAction = (att: ListAttestationFragment) => {
  let decodedData;
  try {
    decodedData = schemaEncoder.decodeData(att.data ?? "");
  } catch (error) {}
  if (!decodedData) {
    try {
      decodedData = schemaEncoderReview.decodeData(att.data ?? "");
    } catch (error) {}
  }
  return {
    ...att,
    data: decodedData ? (convertJsonToObject(decodedData) as ReviewItem) : null,
  };
};
