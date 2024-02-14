module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module:react-native-dotenv"],
      "react-native-reanimated/plugin",
      "@babel/plugin-transform-flow-strip-types",
      ["@babel/plugin-transform-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@utils": "./lib/utils",
            "@services": "./lib/services",
            "@components": "./lib/components",
          },
        },
      ],
    ],
  };
};
