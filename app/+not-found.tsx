import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

function NotFound() {
  return (
    <View className="flex-1 items-center justify-center p-4 bg-background">
      <Text className="text-4xl font-bold mb-4 text-foreground">404</Text>
      <Text className="text-xl mb-6 text-muted-foreground text-center">
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Link href="/" className="bg-primary px-6 py-3 rounded-lg">
        <Text className="text-primary-foreground font-medium">
          Go Back Home
        </Text>
      </Link>
    </View>
  );
}

export default NotFound;
