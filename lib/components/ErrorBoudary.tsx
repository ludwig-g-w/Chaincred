import { ErrorBoundary } from "react-error-boundary";
import { ScrollView, View } from "react-native";
import * as Typo from "@lib/components/ui/typography";
import { Button } from "./ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_AUTH_KEY } from "@lib/constants";

const MyErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      onError={(error) => {
        if (error.message === "UNAUTHORIZED") {
          AsyncStorage.removeItem(STORAGE_AUTH_KEY);
        }
      }}
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <View className="gap-2 flex h-full flex-1 items-center justify-center bg-background">
          <Typo.H3>Something went wrong</Typo.H3>
          <Typo.Lead>{error?.message}</Typo.Lead>
          <Button variant="outline" onPress={resetErrorBoundary}>
            <Typo.Large>Try again</Typo.Large>
          </Button>
        </View>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
