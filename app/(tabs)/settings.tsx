import { Button, Text, VStack } from "@gluestack-ui/themed";

import { EAS_GRAPHQL } from "@env";

import { useAddress } from "@thirdweb-dev/react-native";
import { useQuery, gql } from "@apollo/client";

const List = gql`
  query Attestation($id: String!) {
    attestations(where: { attester: { equals: $id } }) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
    }
  }
`;

export default () => {
  const address = useAddress();

  const result = useQuery(List, {
    skip: !address,
    variables: {
      id: address,
    },
  });

  console.log(JSON.stringify(result.data, null, 2), address);

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Button>
        <Text>Setting</Text>
      </Button>
    </VStack>
  );
};

async function fetchAttestations() {
  try {
    const response = await fetch("https://easscan.org/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Attestations {
          attestations(take: 25) {
            id
            attester
            recipient
            refUID
            revocable
            revocationTime
            expirationTime
            data
          }
        }`,
        variables: {},
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const fetchAttestationById = async (attesterId: string) => {
  const graphqlQuery = {
    query: `
      query Attestation($id: String!) {
        attestations(where: { attester: { equals: $id } }) {
          id
          attester
          recipient
          refUID
          revocable
          revocationTime
          expirationTime
          data
        }
      }
    `,
    variables: {
      id: attesterId,
    },
  };

  try {
    const response = await fetch(EAS_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error("Error:", error);
  }
};
