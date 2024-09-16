import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import MainButton from "@lib/components/MainButton";
import { View } from "react-native";
import * as Typo from "@lib/components/ui/typography";

const WSegue: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/homeIndex");
  }, []);

  return (
    <View className="flex h-full flex-1 items-center justify-center">
      <Typo.H1>Redirecting...</Typo.H1>
      <MainButton onPress={() => router.replace("/homeIndex")}>
        Go to Home
      </MainButton>
    </View>
  );
};

export default WSegue;
