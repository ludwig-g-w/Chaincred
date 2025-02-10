import { Platform } from "react-native";
if (Platform.OS !== "web") {
  require("@thirdweb-dev/react-native-adapter");
  require("expo-dev-client");
}
import "react-native-gesture-handler";
import "./global.css";
import "expo-router/entry";
