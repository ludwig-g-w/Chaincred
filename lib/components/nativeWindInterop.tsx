import BottomSheet from "@gorhom/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { cssInterop } from "nativewind";

export const NWSymbolView = cssInterop(SymbolView, {
  className: {
    target: "style",
  },
});

export const NWBottomSheet = cssInterop(BottomSheet, {
  className: {
    target: "backgroundStyle",
  },
});
