import MainButton from "@lib/components/MainButton";
import * as Typo from "@lib/components/ui/typography";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const WSegue: React.FC = () => {
  const router = useRouter();

  return (
    <View className="flex h-full flex-1 items-center justify-center p-x-8">
      <Typo.H1>Redirecting...</Typo.H1>
      <MainButton onPress={() => router.replace("/homeIndex")}>
        Go to Home
      </MainButton>
    </View>
  );
};

export default WSegue;
