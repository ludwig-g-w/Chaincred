import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

import { Input } from "@lib/components/ui/input";
import { Button } from "@lib/components/ui/button";
import { NWSymbolView } from "./nativeWindInterop";
import { NAV_THEME } from "@lib/constants";

export type ThemedInputProps = {
  onSubmit?: (value: string) => void;
  isSubmitting?: boolean;
} & React.ComponentPropsWithoutRef<typeof Input>;

export function InputWithButton(props: ThemedInputProps) {
  const [val, setVal] = useState("");
  const { onSubmit, isSubmitting } = props;

  return (
    <View className="flex flex-row items-center gap-2 rounded-md ">
      <Input
        className="flex-1 flex-row gap-2 p-4 text-lg border border-border text-foreground rounded-lg"
        value={val}
        onChangeText={setVal}
        {...props}
      />
      {onSubmit && (
        <Button
          variant="outline"
          onPress={() => onSubmit(val)}
          className="p-4 active:scale-90 transition-all"
        >
          {isSubmitting ? (
            <ActivityIndicator size={32} />
          ) : (
            <NWSymbolView
              size={22}
              name="chevron.right.circle"
              tintColor={NAV_THEME["light"].text}
            />
          )}
        </Button>
      )}
    </View>
  );
}
