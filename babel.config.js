module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin",
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-transform-private-methods", { loose: true }],
      "module:react-native-dotenv",
    ],
  };
};
