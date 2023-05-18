/*
一.Node介绍

Node.js是一个基于V8引擎的JavaScript运行环境，Node是由c++、js等代码组成的

开发人员所编写的JavaScript代码，会经由V8引擎编译，然后通过Node的Bindings，将任务放入到Libuv的事件循环中处理执行

nodejs可以使用javascript调用c++，实现计算底层操作

nodejs 没有基于浏览器的javascript的DOM、BOM等概念这与但是拥有文件系统操作功能

二.应用场景：
  1.前端插件库
  2.ssr服务器渲染
  3.node后端项目
  4.脚本工具
  5.中间件
  6.electron

三.安装配置
  安装node，官网下载，LTS为长期支持版本

  常用工具：
    - nvm：node版本管理工具
    - nodemon：自动重新启动node项目

四.运行
  
  node xx.js / nodemon xx.js

  可以使用工具插件nodemon来运行项目，当改变了代码，nodemon会帮我们重新启动项目，无须手动重启

*/

console.log("node 邂逅");
