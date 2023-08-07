module.exports = {
  preset: 'react-native',
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@realm|react-native-webview| react-native-youtube-iframe|@fortawesome|@react-native|@react-navigation)',
  ],
};
