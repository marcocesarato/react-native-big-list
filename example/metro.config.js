const { getDefaultConfig } = require('expo/metro-config');
// Use the exported private path so Node respects the package "exports" map
// (requiring `metro-config/src/...` can fail under newer Node/npm due to exports restrictions).
const exclusionList = require('metro-config/private/defaults/exclusionList');
const path = require('path');

/**
 * Custom Metro configuration for the example app.
 *
 * Important: We intentionally DO NOT include the parent (repo root) node_modules
 * path in nodeModulesPaths anymore because the root devDependencies use a newer
 * React / React Native (0.81.x) version than the example (Expo SDK 51 with
 * React Native 0.74.x). Allowing Metro to resolve modules from the root caused
 * it to pick up the newer react-native implementation which currently ships
 * TypeScript-only syntax (e.g. `} as ReactNativePublicAPI;`) that the example
 * Babel preset (SDK 51) was not configured to parse, triggering a syntax error.
 *
 * By constraining resolution to the example's own node_modules we guarantee the
 * correct (0.74.x) React Native code path is bundled. We still alias the
 * library source so changes to the `lib` folder are reflected live.
 */
const config = getDefaultConfig(__dirname);

// Only watch the library source for live development to avoid pulling in root node_modules versions.
config.watchFolders = [path.resolve(__dirname, '..', 'lib')];

// Allow dependencies from both local and root node_modules (library dev deps) while we block root RN.
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '..', 'node_modules'),
];

// Alias the library to its source entry to ensure it resolves correctly without needing the root node_modules.
config.resolver.alias = {
  'react-native-big-list': path.resolve(__dirname, '..', 'lib', 'index.js'),
  // Force React Native to resolve to the example's version
  'react-native': path.resolve(__dirname, 'node_modules', 'react-native'),
};

// Block the root react-native (0.81.x) to avoid TS-only syntax errors
const rootReactNativePath = path.resolve(__dirname, '..', 'node_modules', 'react-native');
config.resolver.blockList = exclusionList([
  new RegExp(`${rootReactNativePath.replace(/[-/\\^$*+?.()|[\]{}]/g, r => `\\${r}`)}.*`),
]);

// Remove any explicit extraNodeModules overrides (not needed with isolated resolution).
delete config.resolver.extraNodeModules;

module.exports = config;