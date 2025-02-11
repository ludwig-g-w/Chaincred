import { NWIcon } from "@lib/components/nativeWindInterop";
import { Progress } from "@lib/components/ui/progress";
import * as Typo from "@lib/components/ui/typography";
import { NAV_THEME } from "@lib/constants";
import { router, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const slides = [
  {
    title: "Give a review",
    text: "Scan somebody QR code and give them a Smiley 😍 & a comment",
    icon: Platform.OS === "ios" ? "camera.fill" : "camera",
  },
  {
    title: "Find other users",
    text: "Use the discover tab to find other users and see their score",
    icon: Platform.OS === "ios" ? "binoculars.fill" : "binoculars",
  },
  {
    title: "Keep track on your own score",
    text: "On the home screen you see all activity and your own score",
    icon: Platform.OS === "ios" ? "house.fill" : "house-chimney",
  },
  {
    title: "Create your profile",
    text: "Don't forget to edit your profile, you won't be discoverable until that is set up",
    icon: Platform.OS === "ios" ? "gearshape.fill" : "gear",
  },
];

const OnboardingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const handleScroll = (event: any) => {
    const slideWidth = viewportWidth;
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / slideWidth);
    setActiveSlide(newIndex);
  };

  return (
    <View className="flex-1 bg-background relative ">
      <Progress
        className="w-full h-2  bg-border"
        indicatorClassName="bg-primary"
        value={(100 / slides.length) * (activeSlide + 1)}
      />
      <Pressable className="mt-4 ml-4" onPress={() => router.back()}>
        <NWIcon
          name={Platform.OS === "ios" ? "chevron.backward" : "arrow-left"}
          size={24}
          color={NAV_THEME["light"].primary}
        />
      </Pressable>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={viewportWidth}
        decelerationRate="fast"
      >
        {slides.map((slide, index) => (
          <View
            style={{
              width: viewportWidth,
              height: viewportHeight,
            }}
            key={index}
            className="justify-center items-center px-4 gap-4"
          >
            <NWIcon
              size={88}
              color={NAV_THEME["light"].primary}
              resizeMode="scaleAspectFill"
              // @ts-ignore
              name={slide.icon ?? "homepod.fill"}
              tintColor={NAV_THEME["light"].primary}
              animationSpec={{
                repeating: true,
                speed: 0.05,
                effect: {
                  type: "bounce",
                  direction: "up",
                },
              }}
            />
            <Typo.H1 className="text-center">{slide.title}</Typo.H1>
            <Typo.Lead className="text-xl text-center mx-5">
              {slide.text}
            </Typo.Lead>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OnboardingCarousel;
