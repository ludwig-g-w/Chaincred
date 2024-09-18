import { NWIcon } from "@lib/components/nativeWindInterop";
import { Label } from "@lib/components/ui/label";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";
import React, { ReactElement } from "react";
import { Platform } from "react-native";
import { Pressable, View } from "react-native";

type EditableFieldProps = {
  label: string;
  isEditing: boolean;
  onSave: () => void;
  profileValue?: string | null;
  setEditing: Function;
  children: ReactElement;
};

export const EditableField = ({
  label,
  isEditing,
  onSave,
  profileValue,
  setEditing,
  children,
}: EditableFieldProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <>
      <Label nativeID={label}>{label}</Label>
      {isEditing ? (
        <View className="flex-row w-full justify-between items-center min-h-12 gap-4">
          <View className="flex-1">{children}</View>
          <Pressable onPress={onSave}>
            <NWIcon
              className="w-8 h-10 aspect-square"
              name={Platform.OS === "ios" ? "checkmark.circle.fill" : "check"}
              type="hierarchical"
              tintColor={theme.primary}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() =>
            setEditing((prev: any) => ({
              ...prev,
              [label.toLowerCase()]: true,
            }))
          }
          className="flex-row w-full justify-between items-center min-h-12 gap-4"
        >
          <Typo.Lead>{profileValue || `No ${label.toLowerCase()}`}</Typo.Lead>
          <NWIcon
            name={Platform.OS === "ios" ? "pencil.circle.fill" : "pencil"}
            type="hierarchical"
            tintColor={theme.primary}
            className="w-8 h-10 aspect-square"
          />
        </Pressable>
      )}
    </>
  );
};
