/*
 * Jest configuration for ChainCred project
 * Using jest-expo preset for integrating React Native Testing Library.
 */
module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
  ],
  moduleNameMapper: {
    "^lib/(.*)$": "<rootDir>/lib/$1",
  },
  setupFiles: ["./jest.setup.js"],
};
