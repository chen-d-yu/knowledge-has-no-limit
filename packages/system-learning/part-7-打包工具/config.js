const path = require("path");

module.exports = {
  // 指定打包入口文件
  entry: "./src/index.js",
  output: {
    // 指定打包后输入的文件名称
    filename: "boundle.js",
    // 指定打包输出的文件路径
    path: path.resolve(__dirname, "./dist"),
  },
};
