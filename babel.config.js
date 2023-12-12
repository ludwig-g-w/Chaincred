module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      "expo-router/babel",
      "react-native-reanimated/plugin",
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-transform-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@utils": "./utils",
            "@components": "./components",
          },
        },
      ],
    ],
  };
};
