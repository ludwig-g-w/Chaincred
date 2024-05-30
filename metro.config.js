const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig } = require("expo/metro-config");

const extraNodeModules = require("node-libs-browser");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("mjs");
config.resolver.extraNodeModules = extraNodeModules;

config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
