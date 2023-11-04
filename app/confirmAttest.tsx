import { Box, Button, Center, Text } from "@gluestack-ui/themed";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useSigner, useAddress } from "@thirdweb-dev/react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import type { AttestItem } from "../utils/types";
import { match, P } from "ts-pattern";

export default () => {
  const params = useLocalSearchParams<AttestItem>();

  //   const [eas, setEas] = useState<EAS>();
  const signer = useSigner();
  const address = useAddress();

  type MakeAttestation = () => void;
  const makeAttestation: MakeAttestation = async () => {
    const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
    const schemaUID =
      "0x82b6dfa1f89b37cffb75b5766fb10896d8fb0c196bb18b5cdbf44fef12606a96";
    const eas = new EAS(easContractAddress);
    // Signer must be an ethers-like signer.
    await eas.connect(signer as any);
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      "string title,string description,string entityName,uint8 quantity"
    );
    const encodedData = schemaEncoder.encodeData([
      { name: "title", value: params.title, type: "string" },
      { name: "description", value: params.description, type: "string" },
      { name: "entityName", value: "testbara", type: "string" },
      { name: "quantity", value: "1", type: "uint8" },
    ]);

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: 0 as any,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
  };

  return match([params.title, address])
    .with([P.nullish, P._], () => (
      <Box>
        <Text>No Title</Text>
      </Box>
    ))
    .with([P._, P.nullish], () => (
      <Redirect
        href={{ params: { rUrl: "confirmAttest" }, pathname: "/login" }}
      />
    ))
    .otherwise(() => (
      <Box flex={1}>
        <Center mt="$8">
          <Text paddingHorizontal={"$2"} bold size="2xl" mb={"$4"}>
            {params.title}
          </Text>
          <Text paddingHorizontal={"$2"} size="lg" mb={"$4"}>
            {params?.description}
          </Text>
          <Button onPress={makeAttestation}>
            <Text>Confirm attestation</Text>
          </Button>
        </Center>
      </Box>
    ));
};
