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

    2.2.AMD

    2.3.ESModule


  3.require

  4.AMD CMD

  5.ESModule


*/
const fs = require("fs");
console.log(fs);
