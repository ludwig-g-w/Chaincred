import { ConnectWallet } from "@thirdweb-dev/react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <View style={styles.view}>
      <Text>React Native thirdweb starter</Text>
      <ConnectWallet />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
