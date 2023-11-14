// config-overrides.js
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    // Add the necessary fallbacks
    config.resolve.fallback = {
      "assert": require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      http2: require.resolve("http2"),
      zlib: require.resolve("browserify-zlib"),
      process: require.resolve("process/browser"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"), 
      "https": require.resolve("https-browserify"),  // Add this line
      "querystring": require.resolve("querystring-es3"),  // Add this line
      "http": require.resolve("stream-http"),  // Add this line
      "net": require.resolve("stream-http"),  // Add this line
      "fs": false,
    };

    // Check if there's a rule for node_modules
    const rules = config.module.rules.find(rule => rule.oneOf);
    if (rules) {
      const jsRule = rules.oneOf.find(rule => rule.loader && rule.loader.includes('babel-loader'));
      if (jsRule) {
        jsRule.include = [jsRule.include, path.resolve(__dirname, 'node_modules/react-calendar-api')];
      }
    }

    return config;
  },
};
