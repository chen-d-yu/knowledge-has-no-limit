// 边界元字符 => 限定什么开头什么结尾
// 1.^ 表示以什么开头
const reg1 = /^\d/;
console.log(reg1.test("asd")); // false
console.log(reg1.test("1asd")); // true

// 2.$ 表示以什么结尾
const reg2 = /\d$/;
console.log(reg2.test("abc")); // false
console.log(reg2.test("abc ")); // false
console.log(reg2.test("abc1")); // true

// 3.结合使用
const reg3 = /^a\d$/; // a开头，数字结尾
console.log(reg3.test("a1")); // true
console.log(reg3.test("1a")); // false
