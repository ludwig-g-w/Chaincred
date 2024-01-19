import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

import { EAS_CONTRACT, SCHEMA_ADRESS_ACTION, SCHEMA_ADRESS_REVIEW } from "@env";

export const schemaEncoder = new SchemaEncoder(
  "string title,string description,string entityName,uint8 quantity"
);

const eas = new EAS(EAS_CONTRACT);

export async function createActionAttestation({
  signer,
  title,
  description,
  address,
}) {
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
    schema: SCHEMA_ADRESS_ACTION,
    data: {
      recipient: address,
      expirationTime: 0 as any,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  return await tx.wait();
}

const schemaEncoderReview = new SchemaEncoder("uint8 rating,string comment");

export async function createReviewAttestation({
  signer,
  rating = 0,
  comment = "",
  address = "",
}) {
  await eas.connect(signer);

  const encodedData = schemaEncoderReview.encodeData([
    { name: "rating", value: rating, type: "uint8" },
    { name: "comment", value: comment, type: "string" },
  ]);

  const tx = await eas.attest({
    schema: SCHEMA_ADRESS_REVIEW,
    data: {
      recipient: address,
      expirationTime: 0 as any,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  return await tx.wait();
}
