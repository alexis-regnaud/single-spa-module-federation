//const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const FederatedTypesPlugin =
  require("@module-federation/typescript").FederatedTypesPlugin;

module.exports = {
  infrastructureLogging: {
    level: "log",
  },
  output: {
    publicPath: "http://localhost:3003/",
    uniqueName: "angularApp",
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new FederatedTypesPlugin({
      federationConfig: {
        name: "angularApp",
        /*   library: { type: "var", name: "angularApp" },*/
        filename: "remoteEntry.js",
        remotes: {
          reactApp: "reactApp@http://localhost:3001/remoteEntry.js",
        },
        exposes: {
          "./App": "./src/app/app.single-spa.ts",
          "./Parcel": "./src/app/parcel/parcel.single-spa.ts",
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
      },
    }),
  ],
};
