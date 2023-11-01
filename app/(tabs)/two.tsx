import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Button, Text, VStack } from "@gluestack-ui/themed";

import { EAS_CONTRACT, EAS_SCHEMA_REGISTRY } from "@env";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "@thirdweb-dev/react-native";
import { useState } from "react";

export default function App() {
  const [eas, setEas] = useState<EAS>();
  const signer = useSigner();

  const createSchema = async () => {
    const schemaRegistryContractAddress = EAS_SCHEMA_REGISTRY;
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
    schemaRegistry.connect(signer);
    const schema = "bool isTrusted, uint8 voteIndex";
    const resolverAddress = EAS_SCHEMA_REGISTRY; // Sepolia 0.26
    const revocable = true;

    const transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });

    // Optional: Wait for transaction to be validated
    await transaction.wait();
  };
  const getAmountAttestationsForSchema = () => {};
  const getAllSchemasForAddress = () => {};

  const register = async () => {
    try {
      const EASContractAddress = EAS_CONTRACT;
      const eas = new EAS(EASContractAddress);
      eas.connect(signer as any);

      const schemaEncoder = new SchemaEncoder(
        "uint256 eventId, uint8 voteIndex"
      );
      const encodedData = schemaEncoder.encodeData([
        { name: "eventId", value: 1, type: "uint256" },
        { name: "voteIndex", value: 1, type: "uint8" },
      ]);
      const schemaUID =
        "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
          expirationTime: 0 as any,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      const newAttestationUID = await tx.wait();
      console.log("New attestation UID:", newAttestationUID);
      // const schemaRegistryContractAddress =
      //   "0xYourSchemaRegistryContractAddress";
      // const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
      // const schema = "uint256 eventId, uint8 voteIndex";
      // const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
      // const revocable = true;
      // schemaRegistry.connect(signer);
      // const transaction = await schemaRegistry.register({
      //   schema,
      //   resolverAddress,
      //   revocable,
      // });
      // const tx = await transaction.wait();
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Button onPress={register}>
        <Text>Register</Text>
      </Button>
    </VStack>
  );
}
