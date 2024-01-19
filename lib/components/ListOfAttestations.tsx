import { Box, Pressable, Text } from "@gluestack-ui/themed";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import type { AttestItem } from "@utils/types";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import AttestationItem from "./AttestationItem";

const itemSize = 88;

type Props = {
  // @ts-ignore
  onPressItem: (attestItem: AttestItem, idx: number) => void;
};

const ListOfAttestations: React.FC<Props> = (props) => {
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
    <FlashList
      estimatedItemSize={itemSize}
      data={list}
      contentContainerStyle={{ paddingVertical: 12 }}
      renderItem={({ item, index }) => {
        const handleOnPressItem = () => {
          props.onPressItem(item, index);
        };
        return (
          <AttestationItem title={item.title} description={item.description} />
        );
      }}
    />
  );
};

export default ListOfAttestations;
