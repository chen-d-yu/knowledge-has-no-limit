/*
模块化开发：
  1.认识模块化
    JavaScript在拥有模块化之前，是没有这个概念的，代码放在JS文件中，通过script引入，这些文件共享着一个全局作用域，做些简单的校验，代码量比较少
    随着web应用不断发展，JS代码也不断增多，多人协作开发的情况下，在这些前提下，出现了很多问题

    1.共用一个全局作用域，很容易造成命名冲突，变量污染
    2.需要维护这些JS文件之间的依赖关系，引入顺序--自上问下 ↑↑↑
      <script src="a.js"></scrpit>
      <script src="b.js"></scrpit>
      <script src="c.js"></scrpit>
    
    早起的解决方案一个是利用命名空间、IIFE函数形成的块级作用域解决的
    
    命名空间：
    let xiaoming = {
      name: "zhao",
      sayHai(){
          console.log("Hello")
      },
      sayName: ()=>{
          console.log(this.name)
      }
    }

    当然这种方式也有弊端，xiaoming对象的代码极其容易遭到外界篡改

    IIFE块级作用域：
    const moduleA = (function(){
      let a = "abc"
      let b = "cba"

      return { a, b }
    }())

    这种优化过后的解决方案解决了对象的代码容易篡改的问题，但是也有命名冲突的烦恼——modauleA

    以上的这两种方法很难形成一种规范，所以在当时的node社区出现了一些模块化的解决方案：AMD、CMD、CommonJS、以及ES6新出的统一规范ESModule

    模块化把复杂程序分割成相对独立的模块，这样的设计可以有效降低程序的复杂性，提高代码复用性
    模块化解决了以下问题：
    1.模块形成块级作用，解决命名污染、全局污染、变量冲突等问题
    2.将程序切割成一个个封装的模块，外面不能访问到，保证数据的安全性
    3.按需导入导出，只需要暴露该提供的、导入应该使用的
    

  2.前端主流的模块化解决方案
    2.1.CommonJS
    在nodejs中使用CommonJS，使用exports.[variable] = value导出，使用require(path)导入，就可以直接使用导入的变量

      2.1.1 require的本质
      require和exports的本质是个引用赋值，把导出的对象的引用，赋值给导入的require对象
      那这个引用到底是什么对象呢？从module.exports和exports体现
      
      2.1.2 module.exports和exports的关系
      导出可以使用exports.xx = ""，也能使用module.exports = { xx:xx }
      那这两个对象有什么区别呢？

      其实exports对象本质上是module上的一个属性：
        exports =  module.exports
      使用exports导出，本质上是用module.exports导出

      如果exports的引用不发生改变，那么永远指向module.exports
      如果发生改变了，那么与module.exports的引用失效了，就无法正常导出了，导入的那边拿到的就是空
      导入者require实际上拿到的是导出者module.exports的引用

      在node开发中，常用的是module.exports

      其实在CommonJS中是不存在module.exports的，但是Node为了实现模块的导出，使用的是Module类，每个模块都是module的实例
      所以真正导出起作用的是module.exports，但是为了满足CommonJS的规范，所以 exports = module.exports 诞生了

      2.1.3 npm install 
        npm install的依赖，会从远程node仓库拉取依赖包，并且下载到node_module中，与package.json同级

      2.1.5 模块加载顺序
        1.在第一次引入时，也就是require，模块中的代码会先被运行一次
        2.模块多次引入，代码也只会运行一次，因为有导入缓存机制
        3.如果有循环引用的话，那么node会按照深度优先算法执行，先执行嵌套最深的那个模块代码，然后以此向上运行模块代码
          比如 [./嵌套引入.png]

      2.1.6.CommonJS加载是同步的，因为是同步性质，所以在浏览器通常是不使用CommonJS规范

  3.require
    对于 require(x) 导入模块：

    1.如果x是内置核心模块，直接返回核心模块，并且停止查找，比如http、path、fs

    2.如果x是自定义模块，并且以 ./ ../ / 等开头，
      2.1.x如果有后缀名，按照后缀名的格式查找对应的文件
      2.2.如果x没有后缀名，按照以下顺序
          - 查找文件x
          - 查找x.js
          - 查找x.json
          - 查找x.node
      2.3.如果2.2查找不到，那么就会将x作为一个目录，并且按以下顺序查找
          - 查找x/index.js
          - 查找x/index.json
          - 查找x/index.node

      2.4.如果以上都没有找到，报错

    3.如果 X 不是一个核心模块，也不是一个路径，它的查找顺序是什么样的呢
      3.1.先去找核心模块，核心模块找不到 X 后
      3.2.找node_modules文件，如果发现有同名目录 X，就会去node_modules/X/index.js找到并返回，当然能把index.js省略
          require(axios) => require(node_modules/axios/index.js)
      3.3.如果当前目录下没有node_modules，它还会去上层目录中的node_module找，如果找到就返回，找不到，就继续向上查找，直到根目录的node_module都没有，就报错

*/
const variable = require("./utils");
console.log(variable);
