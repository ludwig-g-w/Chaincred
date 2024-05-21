import { SymbolView } from "expo-symbols";
import { cssInterop } from "nativewind";

export const NWSymbolView = cssInterop(SymbolView, {
  className: {
    target: "style",
  },
});
