import * as Typo from "@components/ui/typography";
import ConnectButtonThirdweb from "@lib/components/ConnectButtonThirdweb";
import { Button } from "@lib/components/ui/button";
import {
  LinearGradient as ExpoLinearGradient,
  LinearGradient,
} from "expo-linear-gradient";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { useActiveWallet, useDisconnect } from "thirdweb/react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Star = ({ startY }: { startY: number }) => {
  return (
    <Animated.View
      className="absolute w-[2px] h-[2px] bg-white rounded-[1px]"
      style={[
        {
          left: Math.random() * SCREEN_WIDTH,
          animationName: [
            {
              from: {
                transform: [{ translateY: startY }],
              },
              to: {
                transform: [{ translateY: SCREEN_HEIGHT }],
              },
            },
          ],
          animationDuration: `${2000 + Math.random() * 3000}ms`,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        },
      ]}
    />
  );
};

const AnimatedLinearGradient =
  Animated.createAnimatedComponent(ExpoLinearGradient);

export default function Login() {
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const stars = Array(20)
    .fill(0)
    .map((_, i) => ({
      id: i,
      startY: -Math.random() * SCREEN_HEIGHT,
    }));

  return (
    <View className="flex-1 bg-[#030303] items-center justify-center relative">
      {stars.map((star) => (
        <Star key={star.id} startY={star.startY} />
      ))}
      <View className="z-10">
        <Pressable
          onPress={() => console.log("Button pressed")}
          className="relative w-[240px] h-[70px]"
          style={({ pressed }) =>
            pressed ? { opacity: 0.8, transform: [{ scale: 0.98 }] } : {}
          }
        >
          <View className="flex-1 justify-center items-center border-2 border-transparent gap-4">
            <Typo.H1
              className="text-white  font-bold tracking-[4px]"
              style={{
                textShadowColor: "#00ffcc",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 15,
              }}
            >
              ChainCred
            </Typo.H1>
            <ConnectButtonThirdweb />
            {wallet && (
              <Button
                className="p-x-12 p-y-4 rounded-2xl"
                variant={"outline"}
                onPress={() => disconnect(wallet)}
              >
                <Typo.Large>Disconnect</Typo.Large>
              </Button>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
