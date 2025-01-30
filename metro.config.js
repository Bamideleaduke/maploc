const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    blacklistRE: /react-native\/Libraries\/Utilities\/codegenNativeCommands/, 
    sourceExts: [...defaultConfig.resolver.sourceExts, "ts", "tsx"], 
    // alias: {
    //   "react-native$": "react-native-web",s
    //   "react-native-maps$": "react-native-web/dist/exports/View", 
    // },
    // extraNodeModules: {
    //   "react-native": require.resolve("react-native-web"),
    //   "react-native-maps": path.resolve(__dirname, "empty-module.js"),
    // },
  },
};
