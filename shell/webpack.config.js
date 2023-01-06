//const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;



const config = {
  entry: "./src/index",
  cache: false,
  mode: "development",
  devtool: "source-map",
  devServer: {
    //hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "./"),
    },
    port: 3000,
  },
  output: {
    publicPath: "http://localhost:3000/",
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
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        // This plugin will allow us to use AngularJS HTML templates
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.md$/,
        loader: "raw-loader",
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      /*   library: { type: "var", name: "shell" },*/
      filename: "remoteEntry.js",
      remotes: {
        angularApp: "angularApp@http://localhost:3003/remoteEntry.js",
        reactApp: "reactApp@http://localhost:3001/remoteEntry.js",
      },
      exposes: {
        "./App": "./src/bootstrap",
      },
      shared: {
        "single-spa": {
          singleton: true,
          requiredVersion: deps["single-spa"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

module.exports = config;