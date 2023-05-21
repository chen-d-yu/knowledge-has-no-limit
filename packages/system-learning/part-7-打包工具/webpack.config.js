const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // 指定打包入口文件
  entry: "./src/index.js",
  output: {
    // 指定打包后输入的文件名称
    filename: "boundle.js",
    // 指定打包输出的文件路径
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset",
      },
      {
        test: /\.js/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: "自定义模板", template: "./index.html" }),
  ],
};
