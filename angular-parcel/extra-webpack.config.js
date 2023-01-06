/*
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
*/

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "http://localhost:3004/",
    uniqueName: "angularParcel",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angularParcel",
    //  library: { type: "var", name: "angularParcel" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./App": "./src/app/app.single-spa.ts",
      },
      shared: {
        "@angular/core": { eager: true, singleton: true },
        "@angular/common": { eager: true, singleton: true },
        "@angular/router": { eager: true, singleton: true },
        "single-spa": {
          singleton: true,
          requiredVersion: deps["single-spa"],
        },
        "single-spa-angular": {
          singleton: true,
          requiredVersion: deps["single-spa-angular"],
        },
      },
    }),
  ],
};
