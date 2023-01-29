// 使用less插件
const CracoLessPlugin = require('craco-less');
const path = require('path');
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 修改主题色
            modifyVars: {'@primary-color': '#1DA57A'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style:{
    postOptions:{
      plugins:[
          require('tailwindcss'),
          require('autoprefixer')
      ]
    }
  },
  babel: {
    // 支持装饰器模式语法
    plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  },
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      src: path.resolve(__dirname, 'src'),
    },
  },
};
