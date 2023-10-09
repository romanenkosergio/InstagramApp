/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('@expo/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
    sourceExts: [...config.resolver.sourceExts, 'cjs'],
  },
};
