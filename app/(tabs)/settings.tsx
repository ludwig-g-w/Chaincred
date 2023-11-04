import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Button, Text, VStack } from "@gluestack-ui/themed";

import { EAS_CONTRACT, EAS_SCHEMA_REGISTRY } from "@env";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "@thirdweb-dev/react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default () => {
  const [eas, setEas] = useState<EAS>();
  const signer = useSigner();

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Button>
        <Text>Setting</Text>
      </Button>
    </VStack>
  );
};
