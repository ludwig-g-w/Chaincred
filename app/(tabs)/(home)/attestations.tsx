import { Box, FlatList } from "@gluestack-ui/themed";
import { useAddress } from "@thirdweb-dev/react-native";
import React, { useState } from "react";
import ListItem from "../../../components/ListItem";
import { useCompaniesQuery } from "../../../generated/graphql";
import { schemaEncoder } from "../../../utils/eas";

const Company = () => {
  const [attestationsByAttester, setAttestationsByAttester] = useState<
    Record<Attestation["attester"], Attestation[]>
  >({});

  const address = useAddress();

  useCompaniesQuery({
    skip: !address,
    variables: {
      id: address ?? "",
    },
    onError(err) {
      console.log(err);
    },

    onCompleted: ({ attestations }) => {
      const encoded = attestations.map((a) => {
        let decodedData;
        try {
          decodedData = schemaEncoder.decodeData(a.data ?? "");
        } catch (error) {}
        decodedData = decodedData ? convertJsonToObject(decodedData) : null;
        return {
          ...a,
          data: decodedData,
        };
      });
      setAttestationsByAttester(groupAttestationsByAttester(encoded));
    },
  });

  if (!address) {
    return null;
  }

  return (
    <Box gap={"$4"} py="$4" px="$4" flex={1}>
      <FlatList
        numColumns={1}
        data={attestationsByAttester[address]}
        renderItem={({ item, index }) => (
          <Box mb="$2">
            <ListItem
              description={item.data.description}
              title={item.data.title}
              count={item?.data?.quantity}
            />
          </Box>
        )}
        keyExtractor={(item) => item.data.title}
      />
    </Box>
  );
};

export default Company;

export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocable: boolean;
  revocationTime: number;
  expirationTime: number;
  data: string;
}

function groupAttestationsByAttester(attestations: Attestation[]) {
  return attestations.reduce((acc, attestation) => {
    // Group by 'attester'
    if (!acc[attestation.attester]) {
      acc[attestation.attester] = [];
    }
    acc[attestation.attester].push(attestation);
    return acc;
  }, {});
}

function convertJsonToObject(jsonArray: Record<string, any>[]) {
  let result = {};
  jsonArray.forEach((item) => {
    result[item.name] = item.value.value;
  });
  return result;
}

interface InputData {
  [key: string]: Attestation[];
}

interface ResultObject {
  title: string;
  count: number;
}

function convertToTitleCount(data: InputData): ResultObject[] {
  const result: ResultObject[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const amount = data[key].length;
      result.push({ title: key, count: amount });
    }
  }

  return result;
}
