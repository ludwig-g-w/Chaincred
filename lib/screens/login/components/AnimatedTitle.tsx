import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Animated, { cubicBezier } from "react-native-reanimated";
import * as Typo from "@components/ui/typography";

const startFactory = (x: number, y: number, rotate: number, scale: number) => ({
  "60%": {
    transform: [{ scale }],
  },
  from: {
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotateZ: `-${rotate}deg` },
      { scale: 0.3 },
    ],
  },
  to: {
    opacity: 1,
    transform: [
      { translateX: x },
      { translateY: y },
      { rotateZ: `${rotate}deg` },
      { scale: 0 },
    ],
  },
});

export function AnimatedTitle() {
  return (
    <View testID="animated-title">
      <MaskedView
        className="h-[78px] w-[235px] overflow-visible"
        maskElement={
          <Typo.H1 className="m-0 p-0 pt-10 overflow-visible text-[38px] font-bold text-center">
            ChainCred
          </Typo.H1>
        }
      >
        <Animated.View
          className="flex-1 w-[300%] -mx-full"
          style={[
            {
              animationName: [
                {
                  from: {
                    transform: [{ translateX: "-25%" }],
                  },
                  to: {
                    transform: [{ translateX: "25%" }],
                  },
                },
              ],
              animationDuration: "3s",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            },
          ]}
        >
          <LinearGradient
            colors={["#FFD700", "#FFFACD", "#FFD700"]}
            locations={[0.46, 0.5, 0.54]}
            start={{ x: 0, y: -3 }}
            end={{ x: 1, y: 3 }}
            className="flex-1 w-full"
          />
        </Animated.View>
      </MaskedView>

      <View className="flex-row absolute top-10">
        <Animated.Text
          className="text-[#facc15] opacity-0 relative -bottom-20 text-[32px] -left-[110px]"
          style={[
            {
              animationDelay: "0.1s",
              animationDuration: "2.1s",
              animationFillMode: "forwards",
              animationName: [startFactory(8, -5, 20, 1.1)],
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            },
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          className="text-[#facc15] opacity-0 relative text-[26px] -left-[130px] -top-[10px]"
          style={[
            {
              animationDuration: "2.8s",
              animationFillMode: "forwards",
              animationName: [startFactory(-8, -8, 10, 1.2)],
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
            },
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          className="text-[#facc15] opacity-0 relative text-[30px] -right-[130px] top-[15px]"
          style={[
            {
              animationDelay: "0.2s",
              animationDuration: "2.4s",
              animationFillMode: "forwards",
              animationName: [startFactory(5, 8, 30, 0.8)],
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
            },
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          className="text-[#facc15] opacity-0 relative -bottom-[18px] text-[28px] -right-[105px]"
          style={[
            {
              animationDuration: "2.2s",
              animationFillMode: "forwards",
              animationName: [startFactory(10, -5, 40, 1.3)],
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
            },
          ]}
        >
          ✦
        </Animated.Text>
      </View>
    </View>
  );
}
