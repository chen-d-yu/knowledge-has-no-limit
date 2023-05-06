# this

## 前言

`this`关键字是当前执行上下文的一个对象，在面向对象类的语言中表示当前实例对象的一个引用

但在`JavaScript`中，`this`的指向可不是一成不变的，它很灵活，灵活到会根据==当前执行环境==的变化而变化

## this指向绑定规则

在前言，我们说过`this`很灵活，它的绑定与定义的环境位置无关，而是跟绑定与调用环境有关，`this`是在运行时确定指向的

常见的四种绑定方式
- 独立调用，指向`globalThis`
- 隐式绑定，函数被对象引用并调用
- 显式调用，使用`apply`、`call`、`bind`等方法改变`this`的指向
- `new`关键字绑定

> <span style="font-size:18px; font-weight: bold;">globalThis</span>
> 以前从不同的 JavaScript 环境中获取全局对象需要不同的语句，获取全局属性的繁琐程度极大增加。
> `globalThis` 提供了一个标准的方式来获取不同环境下的全局 `this` 对象，无论你在哪个环境，它会确保可以在有无窗口的各种环境下正常工作，你只需要记住，全局作用域中的 `this` 就是 `globalThis`。

### 独立调用

独立调用表示没有对象`.`语法的方式调用的独立函数调用执行方式，例如`fn()`，这种方式的`this`指向的是当前环境的`globalThis`

```js
// 1.独立调用函数，执行输出this为window
function fn() {
  console.log(this);
}

fn(); 

// 2.在对象中定义函数，但是执行时独立调用，依然指向全局
var obj = {
	name: "test this",
	fn:function(){
		console.log(this)
	}
}

var objFn = obj.fn
objFn()

// 3.在函数内部，存在独立调用，依然指向全局
function bar(callback) {
  callback();
}

bar(fn);

// 4.严格模式下，独立调用的this返回undefined
function strict(){
	"use strict" 
	console.log(this)
}

strict()
```

### 隐式绑定

所谓的隐式绑定，就是通过对象`.`语法调用的函数，当前调用的函数的`this`会绑定到这个对象上面

```js
var obj = {
	name: "test this",
	fn:function(){
		console.log(this)
	}
}

// 1.对象点语法，函数执行输出this为当前的obj对象
obj.fn()

// 2.传入函数中，以对象点语法调用，this依然指向这个对象
function bar(obj){
	obj.fn()
}

bar(obj)
```

### 显式绑定

使用`apply`、`call`、`bind`等方法改变`this`的指向，这三个函数原型的方法都会改变`this`的指向，例如 `fn.apply()` 调用它们，就可以显式改变`this`的指向，它们大致功能都是改变`this`指向，只在使用上有些许差别

它们在传递第一个参数——`this`指向时，都有一个共同的特点，如果第一个实参为非引用数据类型，那么`this`会绑定到该实参的==包装类==上，==如果实参没有包装类，那么当前次的显式绑定会变成独立调用，也就是指向全局`this`==
- apply：执行函数，传递两个参数，第一个参数是需要改变绑定的`this`，第二个参数是函数调用的实参列表，以数组方式传递
- call：执行函数，传递两个参数，第一个参数是需要改变绑定的`this`，剩下的参数是函数调用的实参列表，以剩余参数传递
- bind：执行函数，传递两个参数，第一个参数是需要改变绑定的`this`，剩下的参数是函数调用的实参列表，以剩余参数传递，并且该函数会范湖一个新的函数，新的函数就算是独立调用，后续也不会改变它的`this`指向

```js
var obj = {
	name: "张三",
	age: 18
}

function foo(...args){
	console.log(this)
}

// 1.apply测试传入第一个参数类型，call、bind同理
foo.apply("abc"); // String {'abc'}
foo.apply(123); // Number {123}
foo.apply(true); // Boolean {true}
foo.apply(null); // window
foo.apply(undefined); // window
foo.apply(123n); // BigInt {123n}
foo.apply(Symbol("symbol")); // Symbol {Symbol(symbol), description: 'symbol'}

// 2.apply，执行输出 this => obj
foo.apply(obj, ["abc", 123]) 

// 3.call，执行输出 this => obj
foo.call(obj, "abc", 123)

// 4.bind，执行输出 this => obj，并返回函数
var newFn = foo.bind(obj, "abc", 123, true)
newFn()
```

### new绑定

[[new关键字]]能帮我们通过一个“构造函数”实例化一个对象，通过`new`将`this`绑定到实例对象上

```js
function Foo() {
  this.name = "Foo 构造函数";
  console.log(this);
}

// 1.new关键字实例对象，this指向了foo实例对象
var foo = new Foo();
```

> <span style="font-size:18px; font-weight: bold;">实例对象</span>
> 由构造函数创建的具体对象。当使用 new 关键字调用构造函数时，它会返回一个新的对象（实例对象），该对象继承了构造函数的属性和方法。

## 绑定规则的优先级

上述的四个绑定规则，它们之间也是存在优先级，下列的注意事项掌握后，优先级也就不成问题了
- 独立调用，优先级最低，会被任意一种绑定规则覆盖
- 隐式绑定，它的优先级仅在独立调用之后，显式绑定之前
- 显式绑定`apply/call/bind`之间也存在优先级问题，`bind`的优先级高于`apply/call`，`apply`和`call`是同级，后面的绑定会覆盖前面的
- `new`绑定，优先级最高，但是`new`会和`apply/call`互斥
***
总结下来就是：
- `new`和`apply/call`存在互斥，不能一同使用
- `new`绑定会覆盖所有的绑定 > bind > apply/call > 隐式绑定 > 独立调用

## 总结

1. `this`的绑定是根据当前函数的执行上下文决定的，它会在函数运行时确定`this`指向
2. `this`的四种绑定规则
	1. 独立调用
	2. 隐式绑定
	3. 显式绑定
	4. `new`绑定
3. 绑定规则的优先级
	1.  `new`和`apply/call`存在互斥，不能一同使用
	2. `new`绑定 > `bind` > `apply/call` > 隐式绑定 > 独立调用