import * as Typo from "@lib/components/ui/typography";
import React from "react";
import { NWIcon } from "./nativeWindInterop";
import { Button, ButtonProps } from "./ui/button";
import { View } from "react-native";
import { NAV_THEME } from "@lib/constants";
import { useColorScheme } from "@lib/useColorScheme";

type Props = {
  loading?: boolean;
  children: string;
} & ButtonProps;

const MainButton = ({ loading = false, children, ...rest }: Props) => {
  const { isDarkColorScheme } = useColorScheme();
  const theme = NAV_THEME[isDarkColorScheme ? "dark" : "light"];
  return (
    <Button
      className={`my-auto flex-row gap-4 rounded-lg w-full p-6 items-center justify-center active:scale-90 transition-all`}
      {...rest}
      disabled={loading}
    >
      <Typo.Large>{children}</Typo.Large>
      {loading && (
        <View className="absolute left-4 origin-center animate-spin">
          <NWIcon name="gobackward" tintColor={theme.text} />
        </View>
      )}
    </Button>
  );
};

export default MainButton;
