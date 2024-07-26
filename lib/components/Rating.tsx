import React, { useState } from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Typo from "@lib/components/ui/typography";

const ReviewComponent = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const scaleAnimations = Array.from({ length: 5 }, () => useSharedValue(1));

  const handlePress = (index: number) => {
    const newRating = index;
    setRating(newRating);
    onRatingChange(newRating); // Call the callback function with the new rating

    scaleAnimations.forEach((anim, idx) => {
      anim.value = withSpring(index === idx ? 1.5 : 1);
    });
  };

  const emojis = ["😔", "😐", "😊", "😃", "🤩"];

  return (
    <>
      <Typo.H4>How was your experience?</Typo.H4>
      <View style={{ flexDirection: "row" }}>
        {emojis.map((emoji, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [{ scale: scaleAnimations[index].value }],
              color: rating - 1 === index ? "#ffcc00" : "black",
            };
          });

          return (
            <Pressable key={index} onPress={() => handlePress(index)}>
              <Animated.Text
                style={[{ fontSize: 40, marginHorizontal: 5 }, animatedStyle]}
              >
                {emoji}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default ReviewComponent;
