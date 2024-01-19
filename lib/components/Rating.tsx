import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const ReviewComponent = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const scaleAnimations = Array.from({ length: 5 }, () => useSharedValue(1));

  const handlePress = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange(newRating); // Call the callback function with the new rating

    scaleAnimations.forEach((anim, idx) => {
      anim.value = withSpring(index === idx ? 1.5 : 1);
    });
  };

  const emojis = ["😔", "😐", "😊", "😃", "🤩"];

  return (
    <View style={{ flexDirection: "row" }}>
      {emojis.map((emoji, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: scaleAnimations[index].value }],
            color: rating - 1 === index ? "#ffcc00" : "black",
          };
        });

        return (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <Animated.Text
              style={[{ fontSize: 40, marginHorizontal: 5 }, animatedStyle]}
            >
              {emoji}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ReviewComponent;
