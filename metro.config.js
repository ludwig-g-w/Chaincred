// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const extraNodeModules = require("node-libs-browser");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("mjs");
config.resolver.extraNodeModules = extraNodeModules;

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// config.resolver.resolveRequest = (context, moduleName, platform) => {
//   if (
//     moduleName.startsWith("@thirdweb-dev/react-native") &&
//     platform === "web"
//   ) {
//     return {
//       filePath: `${__dirname}/node_modules/@thirdweb-dev/react/dist/thirdweb-dev-react.cjs.js`,
//       type: "sourceFile",
//     };
//   }

//   return context.resolveRequest(context, moduleName, platform);
// };

module.exports = config;
