// 1.基本用法
// {
//   let a = 10;
//   var b = 1;
// }

// console.log(b);
// console.log(a); // ReferenceError: a is not defined

// 2.不允许重复定义
// {
//   let a = 1;
//   let a = 2; // 无法重新声明块范围变量“a”。
// }

// function fn(args) {
//   let args = 1; // Identifier 'args' has already been declared
// }

// 3.暂时性死区
// var me = "icon";
// {
//   me = "lee"; //  Cannot access 'me' before initialization
//   let me;
// }

// function bar(x = y, y = 2) {
//   return [x, y];
// }
// bar(); // 报错

// 4.不存在变量提升
// let x = "global";
// {
//   console.log(x);
//   let x = "block";
// }

// const
// const PI = 3.1415;
// PI = 3.14; // TypeError: Assignment to constant variable.

// const obj = { a: 1 };
// obj = { a: 1 }; // TypeError: Assignment to constant variable.

// const foo = {};
// // 为 foo 添加一个属性，可以成功
// foo.prop = 123;
// foo.prop; // 123
// // 将 foo 指向另一个对象，就会报错
// foo = {}; // TypeError: Assignment to constant variable.

// const arr = [];
// arr.push("Hello"); // 可执行
// arr.length = 0; // 可执行
// arr = ["Dave"]; // 报错

// 2.初始化
// const a; // SyntaxError: Missing initializer in const declaration

const [a, b, c] = "abc";
console.log(a, b, c);
