import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ListAttestationFragment } from "@generated/graphql"; // Adjust the import path according to where your generated code is
import { thirdwebClient } from "@lib/services/thirdwebClient";
import { convertJsonToObject } from "@utils/attestations";
import { ReviewItem } from "@utils/types";
import { baseSepolia } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";
import { ethers6Adapter } from "thirdweb/adapters/ethers6";
export const schemaEncoder = new SchemaEncoder(
  "string title,string description,string entityName,uint8 quantity"
);

const schemaEncoderReview = new SchemaEncoder("uint8 review,string message");

export async function createReviewAttestation({
  account,
  rating,
  comment,
  address,
}: {
  account: Account;
  rating: number;
  comment?: string;
  address?: string;
}) {
  try {
    const eas = new EAS(process.env.EXPO_PUBLIC_EAS_CONTRACT);
    let ethersSigner = account;
    try {
      ethersSigner = ethers6Adapter.signer.toEthers({
        account: account,
        chain: baseSepolia,
        client: thirdwebClient,
      });
    } catch (error) {
      console.log("ethersSigner error", error);
    }

    // @ts-ignore
    await eas.connect(ethersSigner);

    const encodedData = schemaEncoderReview.encodeData([
      { name: "review", value: rating, type: "uint8" },
      { name: "message", value: comment ?? "", type: "string" },
    ]);

    const tx = await eas.attest({
      schema: process.env.EXPO_PUBLIC_SCHEMA_ADDRESS_REVIEW,
      data: {
        recipient: address!,
        expirationTime: 0 as any,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });

    const receipt = await tx.wait();
    console.log(receipt);

    return receipt;
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

// NOT IN USE
// export async function createActionAttestation({
//   signer,
//   title,
//   description,
//   address,
// }) {
//   const eas = new EAS(process.env.EXPO_PUBLIC_EAS_CONTRACT);
//   // Signer must be an ethers-like signer.
//   await eas.connect(signer as any);
//   // Initialize SchemaEncoder with the schema string

//   const encodedData = schemaEncoder.encodeData([
//     { name: "title", value: title, type: "string" },
//     {
//       name: "description",
//       value: description ?? "",
//       type: "string",
//     },
//     { name: "entityName", value: "", type: "string" },
//     { name: "quantity", value: "1", type: "uint8" },
//   ]);

//   const tx = await eas.attest({
//     schema: process.env.EXPO_PUBLIC_SCHEMA_ADRESS_ACTION,
//     data: {
//       recipient: address,
//       expirationTime: 0 as any,
//       revocable: true, // Be aware that if your schema is not revocable, this MUST be false
//       data: encodedData,
//     },
//   });
//   return await tx.wait();
// }
