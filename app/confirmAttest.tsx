import MyToast from "@components/Toast";
import { EAS_CONTRACT, SCHEMA_ADRESS_ACTION } from "@env";
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
import { createActionAttestation, schemaEncoder } from "@utils/eas";
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
    setLoading(true);
    try {
      const id = await createActionAttestation({
        ...params,
        signer,
      });

      toast.show({
        duration: null,
        placement: "top",
        render: () => <MyToast description={`ID: ${id}`} />,
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
