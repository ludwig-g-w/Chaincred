import { Box, Button, Center, Text } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import type { AttestItem } from "../../../utils/types";
import { useAddress } from "@thirdweb-dev/react-native";

export default () => {
  const local = useLocalSearchParams<{ idx: string }>();
  const [list, setList] = useState<AttestItem[]>([]);
  const address = useAddress();
  useEffect(() => {
    (async () => {
      const list = JSON.parse(
        (await AsyncStorage.getItem("listOfAttestations")) ?? "[]"
      );
      setList(list);
    })();
  }, []);

  const item = list[Number(local.idx)];

  return (
    <Box flex={1}>
      <Center mt="$8">
        <Text paddingHorizontal={"$2"} bold size="2xl" mb={"$4"}>
          {item?.title}
        </Text>
        <Text paddingHorizontal={"$2"} size="lg" mb={"$4"}>
          {item?.description}
        </Text>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "1 00%", width: "100%" }}
          value={`confirmAttest?title=${item?.title}&description=${item?.description}`}
          viewBox={`0 0 256 256`}
        />
        <Link
          href={{
            params: {
              ...list[Number(local.idx)],
              address,
            },
            pathname: "/confirmAttest",
          }}
          asChild
        >
          <Button mt="$4">
            <Text>Testing this attestation</Text>
          </Button>
        </Link>
      </Center>
    </Box>
  );
};
