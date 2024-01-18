import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

const SuspenseFallback = () => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(withSpring(1.5), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
      <Animated.Text style={styles.text}>Loading...</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#61DBFB", // React Blue
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
});

export default SuspenseFallback;
