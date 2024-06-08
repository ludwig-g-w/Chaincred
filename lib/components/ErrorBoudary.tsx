import { Box, Button, Center, Text } from "@gluestack-ui/themed";
import { ErrorBoundary } from "react-error-boundary";
import { ScrollView } from "react-native";
// @ts-ignore
const MyErrorBoundary = ({ children }) => {
  return children;
};

export default MyErrorBoundary;
