import React from "react";
import { Box, Text, VStack, HStack, Divider } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const StepComponent = ({ number, title, children }) => {
  return (
    <HStack style={styles.stepContainer}>
      <VStack style={styles.numberContainer} gap={1}>
        <Box style={styles.numberBox}>
          <Text style={styles.numberText}>{number}</Text>
        </Box>
        <Divider orientation="vertical" w={2} flex={1} bgColor="#a9a9a9" />
      </VStack>
      <VStack flex={1}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text>{children}</Text>
      </VStack>
    </HStack>
  );
};

const Component = () => {
  return (
    <Box style={styles.container}>
      <StepComponent number="1" title="First Step">
        These are instructions or content that only pertain to the first step.
      </StepComponent>
      <StepComponent number="2" title="Second Step">
        These are instructions or content that only pertain to the second step.
      </StepComponent>
      <StepComponent number="3" title="Third Step">
        These are instructions or content that only pertain to the third step.
      </StepComponent>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  stepContainer: {
    alignItems: "center",
    marginBottom: 32, // Tailwind mt-8
  },
  numberContainer: {
    alignItems: "center",
    marginRight: 16, // Tailwind mr-4
  },
  numberBox: {
    backgroundColor: "#a9a9a9", // Tailwind bg-gray-700
    width: 32, // Tailwind w-8
    height: 32, // Tailwind h-8
    borderRadius: 16, // Half of width/height to make it circle
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "white",
  },
  stepTitle: {
    color: "white",
    fontSize: 18, // Tailwind text-lg
    fontWeight: "bold", // Tailwind font-semibold
    marginBottom: 4, // Tailwind mb-1
  },
});

export default Component;
