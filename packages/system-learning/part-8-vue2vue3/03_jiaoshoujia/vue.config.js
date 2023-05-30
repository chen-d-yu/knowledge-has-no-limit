const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Vue脚手架阶段学习',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  // 配置代理
  devServer: {
    // 方式一：
    // 需要代理的请求接口，比如在实际项目就是 192.169.11.9240:8080 （公司开发服务器）
    // 1.不能控制哪些走代理的资源  2.不能配置多台代理
    // proxy: 'http://localhost:5000'
    // 方式二：
    proxy: {
      // /api：请求前缀，只会代理匹配了前缀的请求，比如 192.169.11.9240:8080/api/login => 这个请求就会走代理变为 => loaclhost:8080/api/login
      // 但是这种处理还不够，需要把添加多的 /api 给处理，所以需要借助 pathRewrite 配置请求前缀的目标服务器的路由
      '/api': {
        target: 'http://localhost:5000',
        // 重写路由，处理 /api 前缀
        pathRewrite: { '^/api': '' },
        // 用于支持websocket
        ws: true,
        // 欺骗服务器，配置为true的话，请求后的host地址，与服务器的地址一模一样，为false时，就如实报上 8080
        changeOrigin: true
      }
    }
  },

  // 关闭eslint语法检查
  lintOnSave: false,
  transpileDependencies: true
})
