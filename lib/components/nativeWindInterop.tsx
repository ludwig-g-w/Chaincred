import BottomSheet from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { cssInterop } from "nativewind";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Platform } from "react-native";

export const NWIcon = cssInterop(
  Platform.OS === "ios" ? SymbolView : FontAwesome6,
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
