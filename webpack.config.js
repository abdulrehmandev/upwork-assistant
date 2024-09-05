// webpack.config.js
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mode: "production", // Adjust mode for development or production
  entry: "./src/index.ts", // Entry point for bundling
  output: {
    filename: "index.js", // Output filename for the bundled script
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      }),
    }),
  ],
};
