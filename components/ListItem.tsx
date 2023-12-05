import React from "react";
import { Box, Text, Badge, Button, Center } from "@gluestack-ui/themed";
import { StyleSheet, ImageBackground } from "react-native";

const AttestationCard = ({ title, count, description }) => {
  return (
    <Box style={styles.card}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1686052179725-0af7f4805c80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        alt="Image"
        style={styles.image}
      >
        <Text fontVariant={["lining-nums"]} color="white">
          {title}
        </Text>
        <Text color="white">{description}</Text>

        <Badge style={styles.badge} variant="solid" bg="white">
          <Center flex={1}>
            <Text bold size="lg" fontFamily="$heading">
              {count} +
            </Text>
          </Center>
        </Badge>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 184, // Adjust height as needed
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity as needed
  },
  badge: {
    minHeight: 48,
    minWidth: 48,
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 50,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

export default AttestationCard;
