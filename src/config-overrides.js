// config-overrides.js
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    // Add the necessary fallbacks
    config.resolve.fallback = {
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "https": require.resolve("https-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
    };

    return config;
  },
};