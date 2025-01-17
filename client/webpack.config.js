// webpack.config.js
const path = require('path');

module.exports = {
  // ... your existing configuration ...

  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
    },
  },
  plugins: [
    // Add the ProvidePlugin to automatically load modules instead of having to import or require them everywhere.
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
