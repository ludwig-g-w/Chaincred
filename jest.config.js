module.exports = {
  preset: "react-native",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-*|@react-navigation|@expo|expo-*)/)",
  ],
  testEnvironment: "node",
};
