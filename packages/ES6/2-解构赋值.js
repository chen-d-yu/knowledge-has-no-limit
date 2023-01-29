// const { name, age } =
// const { name, age, size = "36D" } = { name: "小红", age: 24 };

// function arrFn([x, y]) {
//   return x + y;
// }
// arrFn([1, 2]);

// function objFn({ x, y }) {
//   return x + y;
// }
// objFn({ x: 1, y: 2 });

// 1.解构模块中的指定属性和方法，从nodejs举例子
// const { resolve } = require("path");
// 2.遍历map结构
// [{ name: "张三丰", age: 12 }].map(({ name, age }) => {});
// 3.交换变量
// let a = 1;
// let b = 2;
// [a, b] = [b, a];
// 4.剔除不需要的变量
// const person = { name: "小明", age: 12, addr: "北京" };
// const { addr, ...data } = person; // { name: '小明', age: 12 }
// 5.解构入参并赋默认值
// function fn({ x, y = 2 }) {
// console.log(x + y);
// }
// fn({ x: 1 });

// let target = "hello world";

// let s = "hello";
// let s1 = "world";

// console.log(target.endsWith(s));
// console.log(target.endsWith(s1));
const s1 = "hello".repeat(1); // "hello"
const s2 = "hello".repeat(0.9); // ""
const s3 = "hello".repeat(0); // ""
const s4 = "hello".repeat(2.9); // "hellohello"
// const s5 = "hello".repeat(-1); // 报错
const s6 = "hello".repeat(-0.4); // ""
const s7 = "hello".repeat(NaN); // ""
const s8 = "hello".repeat("x"); // ""
const s9 = "hello".repeat("3"); // "hellohellohello"

console.log(s1, s2, s3, s4, s6, s7, s8, s9);
