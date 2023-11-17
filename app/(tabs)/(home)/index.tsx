import {
  Box,
  Button,
  Center,
  FlatList,
  Pressable,
  Text,
} from "@gluestack-ui/themed";

import { Link, useFocusEffect } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AttestItem } from "../../../utils/types";
import { usePathname } from "expo-router";

const itemSize = 88;

export default () => {
  const [list, setList] = useState<AttestItem[]>([]);

  useFocusEffect(() => {
    (async () => {
      const list = JSON.parse(
        (await AsyncStorage.getItem("listOfAttestations")) ?? "[]"
      );
      setList(list);
    })();
  });

  return (
    <Box flex={1}>
      <FlashList
        estimatedItemSize={itemSize}
        data={list}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item, index }) => {
          return (
            <Link
              asChild
              href={{
                pathname: "/attestDetails",
                params: {
                  idx: index,
                },
              }}
            >
              <Pressable
                justifyContent="center"
                h={itemSize}
                flex={1}
                bg="$white"
                rounded="$lg"
                padding="$3"
                marginHorizontal="$4"
                mb="$2"
              >
                <Text bold>{item.title}</Text>
                <Text>{item.description}</Text>
              </Pressable>
            </Link>
          );
        }}
      />
      <Link asChild href={"/createAttestation"}>
        <Button m="$10" bg="$backgroundDark950">
          <Text color="white">Create Attestation</Text>
        </Button>
      </Link>
    </Box>
  );
};
