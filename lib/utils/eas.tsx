import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

export const schemaEncoder = new SchemaEncoder(
  "string title,string description,string entityName,uint8 quantity"
);
