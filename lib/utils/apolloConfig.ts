import { TypedTypePolicies } from "../../apollo-helpers";
import { convertJsonToObject } from "./attestations";
import { schemaEncoder } from "./eas";

export const typePolicies: TypedTypePolicies = {
  Attestation: {
    fields: {
      data: {
        read: (data: string) => {
          let decodedData;
          try {
            decodedData = schemaEncoder.decodeData(data ?? "");
          } catch (error) {}
          return decodedData ? convertJsonToObject(decodedData) : null;
        },
      },
    },
  },
};
