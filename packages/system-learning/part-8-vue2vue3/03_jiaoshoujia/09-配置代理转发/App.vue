<template>
  <div id="app">
    <button @click="getStudents">获取学生信息</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  methods: {
    getStudents() {
      /*
       * 点击按钮后发现会报跨域错误，违背了同源策略，协议、主机、端口三者有一个不同，都算违背同源策略
       * axios.get('http://localhost:5000/students')
       *
       * 请求是发出去了，但是浏览器拦截了相应信息
       * 标准的解决跨域方案：
       *   1.服务器解决——cors，需要麻烦后端人员在服务器配置
       *   2.前端通过绕过浏览器的方法——jsonp，利用script标签在引入外部资源不收同源策略的限制，只能解决get请求，其他类型处理不了
       *   3.配置代理转发——在前端服务和后台服务之间，起一个服务，这个服务和前端的服务一样，将前台后台的所有请求，转发到这台代理服务器，经过处理变为了同源策略的请求
       *
       * 开启代理的方式：
       *   1.nginx配置代理
       *   2.VueCli开启代理服务器：vue.config.js -> devServer.proxy
       *     // 配置代理
       *     devServer: {
       *     // 需要代理的请求接口，比如在实际项目就是 192.169.11.9240:8080 （公司开发服务器）  },
       *     proxy: 'http://localhost:5000'
       *     },
       *
       * 如果代理请求服务器的请求内容，恰好跟public的资源一致，比如请求 http://localhost:8080/favicon.ico 代理就会走本地的前台项目，会把 public/favicon.ico 下的资源返回给前台
       * 而且不能配置多台代理服务器，所以需要换一种代理设置方式，兼容这两个问题
       *  devServer: {
       *    // 方式一：
       *    // 需要代理的请求接口，比如在实际项目就是 192.169.11.9240:8080 （公司开发服务器）
       *    // 1.不能控制哪些走代理的资源  2.不能配置多台代理
       *    // proxy: 'http://localhost:5000'
       *    // 方式二：
       *    proxy: {
       *    // /api：请求前缀，只会代理匹配了前缀的请求，比如 192.169.11.9240:8080/api/login => 这个请求就会走代理变为 => loaclhost:8080/api/login
       *    // 但是这种处理还不够，需要把添加多的 /api 给处理，所以需要借助 pathRewrite 配置请求前缀的目标服务器的路由
       *    '/api': {
       *        target: 'http://localhost:5000',
       *        // 重写路由，处理 /api 前缀
       *        pathRewrite: { '^/api': '' },
       *        // 用于支持websocket
       *        ws: true,
       *        // 欺骗服务器，配置为true的话，请求后的host地址，与服务器的地址一模一样，为false时，就如实报上 8080
       *        changeOrigin: true
       *      }
       *    }
       *  },
       * */

      axios.get('http://localhost:8080/students').then(res => console.log(res))
    }
  }
}
</script>
