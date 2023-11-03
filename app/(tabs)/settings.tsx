import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { Button, Text, VStack } from "@gluestack-ui/themed";

import { EAS_CONTRACT, EAS_SCHEMA_REGISTRY } from "@env";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "@thirdweb-dev/react-native";
import { useState } from "react";

export default () => {
  const [eas, setEas] = useState<EAS>();
  const signer = useSigner();

  const getAmountAttestationsForSchema = () => {};
  const getAllSchemasForAddress = () => {};

  type MakeAttestation = (inp: { title: string; description: string }) => void;

  const createAttestation = () => {};

  const makeAttestation: MakeAttestation = async ({ title, description }) => {
    const easContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a";
    const schemaUID =
      "0x7719b0dcc887693e734e674852f53ce29be6f8b6361a364dd0b8deaa002d48f3";
    const eas = new EAS(easContractAddress);
    // Signer must be an ethers-like signer.
    await eas.connect(signer as any);
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(
      "string Title,string Description,address CompanyWallet,uint8 Quantity,string NameOfCompany"
    );
    const address = await signer?.getAddress();
    const encodedData = schemaEncoder.encodeData([
      { name: "Title", value: title, type: "string" },
      { name: "Description", value: description, type: "string" },
      {
        name: "CompanyWallet",
        value: address ?? "",
        type: "address",
      },
      { name: "Quantity", value: "1", type: "uint8" },
      { name: "NameOfCompany", value: "", type: "string" },
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

  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <Button>
        <Text>Setting</Text>
      </Button>
    </VStack>
  );
};
