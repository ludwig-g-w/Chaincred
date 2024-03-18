import { EAS_GRAPHQL } from "@env";
import { getSdk } from "@generated/graphql"; // Adjust the import path according to where your generated code is
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(EAS_GRAPHQL);
export const sdk = getSdk(client);
