# new

> 用于创建一个新对象的操作符

了解`new`关键字之前，先来聊一下构造函数

## 构造函数

有过面向对象语言基础的小伙伴们可能会耳熟能详的几个名词，**构造函数、类、继承、多态...**等面向对象的概念

但是在`JavaScript`中，并不存在上述的概念，但类却是面向对象的核心。
个人猜想，为了照顾从面向对象语言转过来的小伙伴，`JavaScript`利用原型链等机制去模拟类的作用，实现面向对象的编程范式。

但构造函数在`JavaScript`中并不是一种语法，而是一种规范，一种约定俗成的规范。
构造函数通常以大驼峰开头，它的本质是一个普通的函数，当这个普通函数被`new`关键字所操作时，它就拥有了构造函数的意义。

**构造函数的出现解决了什么问题？**

举个例子，我们要录入一个班级中每位同学的信息，那我们可以创建一些对象

```js
var p1 = { name: 'zs', age: 6, gender: '男', hobby: 'basketball' }; 
var p2 = { name: 'ls', age: 6, gender: '女', hobby: 'dancing' }; 
var p3 = { name: 'ww', age: 6, gender: '女', hobby: 'singing' }; 
var p4 = { name: 'zl', age: 6, gender: '男', hobby: 'football' };
```

像上面这样，我们为每一位同学创建一个对象，但是我们发现，随着小同学越来越多，我们要写的重复代码也越来越多。

这个时候 **模板——构造函数** 的优势就体现出来了。虽然每位同学都有各自的`name、gender、hobby`，但是它们的值是不同的，我们就可以将这些不同值的属性，当做构造函数的参数传递进去，而相同值的属性`age`，就可以写死。
定义好构造函数后，就可以通过`new`关键字，快速创建对象。

```js
function Student(name, gender, hobby){
	this.name = name
	this.gender = gender
	this.hobby = hobby
	this.age = 6
}

var p1 = new Person('zs', '男', 'basketball'); 
var p2 = new Person('ls', '女', 'dancing'); 
var p3 = new Person('ww', '女', 'singing'); 
var p4 = new Person('zl', '男', 'football');
```

你会发现，批量创建相似的对象会变得如此简单，在创建具有一些相似的特征（属性）、行为（方法）的对象时，使用构造函数大大方便开发人员批量创建对象，实现**代码复用**。

## new关键字

构造函数在`JavaScript`中，由始至终就是个普通函数，让它起到构造函数作用的，是`new`关键字

`new`关键字创建对象的步骤大致分为四个步骤：
- 创建一个空的对象，作为`this`并指向这个空的对象
- 将`this`的隐式原型，指向构造函数的显式原型
- 执行构造函数内的代码
- 如果该构造函数没有返回对象，则返回`this`，否则返回这个对象

**基础代码实现**

```js
function customNew(constructor, ...args){
	// 1.创建一个空的对象，并用this指向它
	var thisObj = {}
	
	// 2.将this的隐式原型，指向构造函数的显式原型
	Object.setPrototypeOf(thisObj, constructor.prototype);

	// 3.执行构造函数的代码
	constructor.call(thisObj,...args)

	// 4.返回this
	return thisObj
}

function Person(name) {
	this.name = name;
}

var obj = customNew(Person, "张三");

console.log(obj); // 父类指向了Person构造函数
```

## 总结

1. 构造函数是普通函数，一般以大写字母开头，被`new`关键字操作后的就是构造函数
2. 构造函数是一种模板构建对象的方法，方便**代码复用**，批量创建相同特征的对象
3. `new`关键字操作背后大致有四个步骤
	1. 创建空对象作为`this`
	2. 将空对象的隐式原型指向了构造函数的显式原型
	3. 执行构造函数体代码
	4. 构造函数内返回非引用类型，则返回空对象`this`，否则返回显式return的对象
4. 就算是`ES6`的`class`语法，只要`new`操作了，底层逻辑也是这套