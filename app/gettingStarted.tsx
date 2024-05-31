import React, { useRef, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import * as Typo from "@lib/components/ui/typography";
import { NWSymbolView } from "@lib/components/nativeWindInterop";
import { NAV_THEME } from "@lib/constants";
import { Progress, ProgressFilledTrack } from "@gluestack-ui/themed";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const slides = [
  {
    title: "Give a review",
    text: "Scan somebody QR code and give them a Smiley 😍 & a comment",
    icon: "camera.fill",
  },
  {
    title: "Find other users",
    text: "Use the discover tab to find other users and see their score",
    icon: "binoculars.fill",
  },
  {
    title: "Keep track on your own score",
    text: "On the home screen you see all activity and your own score",
    icon: "house.fill",
  },
  {
    title: "Create your profile",
    text: "Don't forget to edit your profile, you won't be discoverable until that is set up",
    icon: "gearshape.fill",
  },
];

const OnboardingCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const handleScroll = (event) => {
    const slideWidth = viewportWidth;
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / slideWidth);
    setActiveSlide(newIndex);
  };

  return (
    <View className="flex-1 bg-background">
      <Progress
        value={(100 / slides.length) * (activeSlide + 1)}
        w={"$full"}
        h="$2"
        size="xl"
        rounded={"$none"}
      >
        <ProgressFilledTrack
          rounded={"$none"}
          bgColor={NAV_THEME["light"].primary}
        />
      </Progress>
      {/* <ProgressBar
        progress={}
        height={10}
        backgroundColor="#3498db"
        borderRadius={0}
        animated
      /> */}
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
            <NWSymbolView
              size={88}
              resizeMode="scaleAspectFill"
              // @ts-ignore
              name={slide.icon ?? "homepod.fill"}
              tintColor={NAV_THEME["light"].secondary}
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
