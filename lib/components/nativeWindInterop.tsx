import BottomSheet from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { cssInterop } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";

export const NWSymbolView = cssInterop(
  Platform.OS === "ios" ? SymbolView : Entypo,
  {
    className: {
      target: "style",
    },
  }
);

export const NWBottomSheet = cssInterop(BottomSheet, {
  className: {
    target: "backgroundStyle",
  },
});
