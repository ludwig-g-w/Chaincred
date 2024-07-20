import { Box, Pressable, Text } from "@gluestack-ui/themed";

import { storage } from "@lib/services/storage.client";
import { FlashList } from "@shopify/flash-list";
import type { AttestItem } from "@utils/types";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import AttestationItem from "./AttestationItem";

const itemSize = 88;

type Props = {
  // @ts-ignore
  onPressItem?: (attestItem: AttestItem, idx: number) => void;
};

const ListOfAttestations: React.FC<Props> = (props) => {
  const [list, setList] = useState<AttestItem[]>([]);

  return (
    <FlashList
      estimatedItemSize={itemSize}
      data={list}
      contentContainerStyle={{ paddingVertical: 12 }}
      ItemSeparatorComponent={() => <Box h="$2" />}
      renderItem={({ item, index }) => {
        const handleOnPressItem = () => {
          props.onPressItem && props.onPressItem(item, index);
        };
        return (
          <AttestationItem
            onPress={handleOnPressItem}
            title={item.title}
            description={item.description}
          />
        );
      }}
    />
  );
};

export default ListOfAttestations;
