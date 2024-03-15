import { ListAttestationFragment } from "generated/graphql";

export function groupAttestationsByAttester(
  attestations?: ListAttestationFragment[]
) {
  if (!attestations?.length) return;
  return attestations.reduce(
    (
      acc: Record<
        ListAttestationFragment["attester"],
        ListAttestationFragment[]
      >,
      attestation
    ) => {
      // Group by 'attester'
      if (!acc[attestation.attester]) {
        acc[attestation.attester] = [];
      }
      acc[attestation.attester].push(attestation);
      return acc;
    },
    {}
  );
}

export function convertJsonToObject(jsonArray: Record<string, any>[]) {
  let result = {};
  jsonArray.forEach((item) => {
    // @ts-ignore
    result[item.name] =
      typeof item.value.value === "bigint"
        ? Number(item.value.value)
        : item.value.value;
  });
  return result;
}

interface InputData {
  [key: string]: ListAttestationFragment[];
}

interface ResultObject {
  title: string;
  count: number;
  id: string;
}

export function convertToTitleCount(data: InputData): ResultObject[] {
  const result: ResultObject[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const amount = data[key].length;
      result.push({ title: key, count: amount, id: data[key][0].id });
    }
  }

  return result;
}

export interface ConvertedAttestation {
  __typename: string;
  attester: string;
  data: {
    description: string;
    entityName: string;
    quantity: number;
    title: string;
  };
  id: string;
  recipient: string;
  timeCreated: number;
}

export interface ProcessedAttestation {
  title: string;
  count: number;
  items: ConvertedAttestation[];
}

export function processAttestations(
  address: string,
  attestations: ConvertedAttestation[]
): ProcessedAttestation[] {
  const filteredAttestations = attestations.filter(
    (attestation) => attestation.attester === address
  );

  const groupedAttestations: { [title: string]: ConvertedAttestation[] } = {};
  filteredAttestations.forEach((attestation) => {
    const title: string | undefined = attestation?.data?.title;
    if (!groupedAttestations[title]) {
      groupedAttestations[title] = [];
    }
    groupedAttestations[title].push(attestation);
  });

  return Object.keys(groupedAttestations).map((title) => ({
    title,
    count: groupedAttestations[title].length,
    items: groupedAttestations[title],
  }));
}
