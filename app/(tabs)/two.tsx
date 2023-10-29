import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Button, Text, VStack } from "@gluestack-ui/themed";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallets } from "@thirdweb-dev/react-native";

export default function App() {
  const [eas, setEas] = useState<EAS>();
  const a = useWallets();

  const getAllAttestations = () => {};

  const register = async () => {
    try {
      //   const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
      //   const eas = new EAS(EASContractAddress);
      //   eas.connect(signer as any);
      //   // Initialize SchemaEncoder with the schema string
      //   const schemaEncoder = new SchemaEncoder(
      //     "uint256 eventId, uint8 voteIndex"
      //   );
      //   const encodedData = schemaEncoder.encodeData([
      //     { name: "eventId", value: 1, type: "uint256" },
      //     { name: "voteIndex", value: 1, type: "uint8" },
      //   ]);
      //   const schemaUID =
      //     "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
      //   const tx = await eas.attest({
      //     schema: schemaUID,
      //     data: {
      //       recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      //       expirationTime: 0 as any,
      //       revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      //       data: encodedData,
      //     },
      //   });
      //   const newAttestationUID = await tx.wait();
      //   console.log("New attestation UID:", newAttestationUID);
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
      <Button onPress={getAllAttestations}>
        <Text>Register</Text>
      </Button>
    </VStack>
  );
}
