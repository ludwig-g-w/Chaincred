import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["https://base-sepolia.easscan.org/graphql"],
  documents: ["app/**/*.{ts,tsx,graphql}", "lib/**/*.{ts,tsx,graphql}"],
  generates: {
    "./generated/generated.ts:": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
export default config;
