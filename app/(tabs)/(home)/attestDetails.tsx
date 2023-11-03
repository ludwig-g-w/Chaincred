import { Box, Center, Text } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default () => {
  const navi = useNavigation();

  const [list, setList] = useState<{ title: string; desc: string }[]>([]);
  useEffect(() => {
    (async () => {
      const list = JSON.parse(
        (await AsyncStorage.getItem("listOfAttestations")) ?? "[]"
      );
      setList(list);
    })();
  }, []);

  return (
    <Box flex={1}>
      <Center mt="$8">
        <Text paddingHorizontal={"$2"} bold size="2xl" mb={"$4"}>
          {list[0]?.title}
        </Text>
        <Text paddingHorizontal={"$2"} size="lg" mb={"$4"}>
          {list[0]?.desc}
        </Text>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"make/attestation/[id]"}
          viewBox={`0 0 256 256`}
        />
      </Center>
    </Box>
  );
};
