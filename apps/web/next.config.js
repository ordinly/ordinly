/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["@ordinly/api-abstraction"]);

module.exports = withTM({
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  reactStrictMode: false,
});
