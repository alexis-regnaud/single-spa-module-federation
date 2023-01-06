/*
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
*/

/*
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
*/

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  devtool: "source-map",
  devServer: {
    //hot: true,
    //historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./"),
    },
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("@babel/preset-react")],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "reactParcel",
      //library: { type: "var", name: "reactParcel" },
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./App": "./src/bootstrap",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "single-spa-react": {
          singleton: true,
          requiredVersion: deps["single-spa-react"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["main"],
    }),
  ],
};




/*
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app",
    projectName: "react-app",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
*/


/*
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app",
    projectName: "react-parcel",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
*/
