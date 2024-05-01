import { Box, Button, Center, Text } from "@gluestack-ui/themed";
import { ErrorBoundary } from "react-error-boundary";
import { ScrollView } from "react-native";
// @ts-ignore
const MyErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        return (
          <ScrollView>
            <Box bgColor="$red900" flex={1}>
              <Center>
                <Text color="white" bold fontSize={"$2xl"}>
                  Something went wrong
                </Text>
                <Text color="white" mt="$4">
                  {JSON.stringify(error)}
                </Text>
                <Button onPress={resetErrorBoundary} mt="auto">
                  <Text color="white">Reset</Text>
                </Button>
              </Center>
            </Box>
          </ScrollView>
        );
      }}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
