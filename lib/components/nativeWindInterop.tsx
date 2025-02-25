import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  NativeSymbolViewProps,
  SymbolView,
  SymbolViewProps,
} from "expo-symbols";
import { cssInterop } from "nativewind";
import { Platform } from "react-native";

type IconType = typeof SymbolView | typeof FontAwesome6;

type Props = SymbolViewProps & {
  [key: string]: any;
};

export const NWIcon = cssInterop<IconType, Props>(
  Platform.OS === "ios" ? SymbolView : FontAwesome6,
  {
    className: {
      target: "style",
    },
  }
) as React.FC<Props>;

export const NWBottomSheet = cssInterop(BottomSheet, {
  className: {
    target: "backgroundStyle",
  },
});
