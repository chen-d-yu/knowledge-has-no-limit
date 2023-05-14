# 箭头函数

常见声明函数的方式有三种
- 函数表达式
- 函数声明
- 箭头函数
- 构造函数声明

在这几种方式中，箭头函数的声明方式比其他的更加简洁

```javascript
// 1.函数表达式
var fn = function(){}

// 2.函数声明
function foo(){}

// 3.箭头函数，()参数列表，{}方法体，用箭头链接
const arrowFun = () => {}

// 4.构造函数声明
const func = new Function()
```

函数声明和函数表达式的区别：

1. 函数声明会把函数提升到当前作用域的顶层，即使你在代码块最后面定义的函数
2. 函数表达式不会产生函数提升，就算用`var`也只是提前声明而未定义

## 基本语法

箭头函数对于参数和方法体，存在一些省略的写法，使得箭头函数更加简洁方便

**省略规则：**

1. 如果箭头函数只有一个参数，可省略参数括号
2. 如果代码体中只有一句代码，可以省略大括号
3. 如果该箭头函数返回的是对象，需要用括号包裹

```js
// 1.基本语法：():参数列表 => {}:语法代码块
const fn = () => {
  console.log("arrow function fn")
}

// 2.只有一个参数，可以省略参数括号
const fn1 = a => {};

// 3.语法体只有一行代码，可以省略大括号
const sum = (x, y) => x + y

// 4.语法体只有一行返回语句，且返回的是对象，省略大括号
const foo = (name) => ({name:name})
```

## 箭头函数的特点

### 1. 不会绑定`this`

箭头函数不会创建自己的`this`，它只会从自己的作用域链的上一层继承` this`

箭头函数的`this`指向，是在函数定义环节就已经确定了，因为自身无法拥有`this`会去上层作用域寻找

```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // this正确地指向 p 实例
  }, 1000);
}

var p = new Person();
```

没有绑定`this`，所以无法改变`this`的指向，`apply | call | bind`等改变`this`指向的方法自然无效

```js
var obj = {
	name: "张三",
	foo: () => {
		console.log(this)
	}
}

var person = {
	name: "孙悟空"
}

// 箭头函数没有this，所以这些方法对箭头函数无效
// this还是按照作用域链查找的方式，忽略obj字面量的{}
obj.foo.apply(person) // window
```

> 对象字面量不会形成作用域
>
> 对象字面亮的大括号仅仅表示创建对象的语法糖，不会形成作用域

### 2. 不绑定`arguments`

普通函数中存在一个隐式的`arguments`类数组对象，在箭头函数中却不会绑定这个对象，不会绑定意味着它会和`this`一样，只会从自己作用域链的上一层继承过来，如果没有这个对象，恰好你又访问了它，那么喜提报错

```js
var testArguments = () => {
	console.log(arguments)
}

testArguments() // Uncaught ReferenceError: arguments is not defined
```

在箭头函数内部更加推荐剩余参数

::: tip 剩余参数

在`ES6`，优先推荐在函数内部使用剩余参数，而不是`arguments`类数组对象

:::

```js
// 使用剩余参数替代arguments
// 剩余参数args形参是个真正的数组，它接收testArgs函数的剩余参数
var testArgs = (...args) => {
	console.log(args) 
  console.log(Array.isArray(args)) 
}

testArgs(1,2,3,4) // [1,2,3,4] true
```

### 3. 箭头函数无法作为构造函数

箭头函数是一个特殊的函数对象，在**小学二年级课本有教**，只要是对象基本会有它的隐式原型`__proto__`，而函数对象还会在这个基础上多一个显式原型`prototype`——[原型链](../gossip/prototype)。

箭头函数特殊的点就在于，它是没有显式原型`prototype`属性的，就跟普通对象是没有区别

![](https://minio.sciento.cn/st-public/2/4a7e2bd4db52450bbaa363e3e16b5295@箭头函数原型.png)

由于它没有显式原型`prototype`，那么它作为构造函数时，在执行[new关键字](./new)的操作时，内部就会抛出错误`Uncaught TypeError: fn is not a constructor`

## 总结

1. 箭头函数可以在参数、方法体有一些省略写法
2. 箭头函数自身不绑定`this|arguments`等对象，它只会从自己的作用域链的上一层继承
3. 箭头函数被`apply|call|bind`等改变`this`指向的方法调用时，改变`this`指向的操作无效，函数会正常调用
4. 箭头函数是个特殊的函数对象，它没有显式原型`prototype`，所以它无法被当做构造函数，无法被`new`关键字所操作