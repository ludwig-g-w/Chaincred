import MyToast from "@components/Toast";
import { EAS_CONTRACT, SCHEMA_ADRESS } from "@env";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import {
  Box,
  Button,
  ButtonSpinner,
  Center,
  Text,
  useToast,
} from "@gluestack-ui/themed";
import { useAddress, useSigner } from "@thirdweb-dev/react-native";
import { schemaEncoder } from "@utils/eas";
import { AttestItem } from "@utils/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import invariant from "tiny-invariant";
import { P, match } from "ts-pattern";

export default () => {
  const params = useLocalSearchParams<
    AttestItem & {
      address: string;
    }
  >();

  const signer = useSigner();
  const address = useAddress();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  async function makeAttestation() {
    invariant(params.address && params.title, "Missing data");
    const schemaUID = "";
    a;
    const eas = new EAS(EAS_CONTRACT);
    // Signer must be an ethers-like signer.
    await eas.connect(signer as any);
    // Initialize SchemaEncoder with the schema string

    const encodedData = schemaEncoder.encodeData([
      { name: "title", value: params.title, type: "string" },
      {
        name: "description",
        value: params.description ?? "",
        type: "string",
      },
      { name: "entityName", value: "testbara", type: "string" },
      { name: "quantity", value: "1", type: "uint8" },
    ]);

    setLoading(true);

    try {
      const tx = await eas.attest({
        schema: SCHEMA_ADRESS,
        data: {
          recipient: params.address,
          expirationTime: 0 as any,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      const newAttestationUID = await tx.wait();
      console.log("New attestation UID:", newAttestationUID);

      toast.show({
        duration: null,
        placement: "top",
        render() {
          return <MyToast />;
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return match([params?.title, address])
    .with([P.nullish, P._], () => (
      <Box>
        <Text>No Title</Text>
      </Box>
    ))
    .otherwise(() => (
      <Box py="$8" px="$2" flex={1}>
        <Center flex={1}>
          <Text bold size="2xl" mb={"$4"}>
            {params?.title}
          </Text>
          <Text size="lg" mb={"$4"}>
            {params?.description}
          </Text>
        </Center>
        <Box flex={1}>
          <Button
            bg={loading ? "$coolGray500" : "$black"}
            disabled={loading}
            mt="auto"
            onPress={makeAttestation}
          >
            <Text color="white">Confirm attestation</Text>
            {loading && <ButtonSpinner right="$4" position="absolute" />}
          </Button>
        </Box>
      </Box>
    ));
};
