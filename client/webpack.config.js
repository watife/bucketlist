const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("@babel/polyfill");

module.exports = env => {
  const isProd = env === "production";
  return {
    entry: ["@babel/polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|pdf|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name]-[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, "../.env")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devtool: isProd ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    }
  };
};
