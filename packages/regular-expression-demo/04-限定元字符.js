// 限定元字符 => 修饰限定元字符前面一个符号的出现次数
// 1.* 表示出现 0~n 次
const reg1 = /^\d*$/; // => 表示字符串数字字符能出现 0~n 次
console.log(reg1.test("")); // true
console.log(reg1.test("1")); // true
console.log(reg1.test("12")); // true
console.log(reg1.test("ab12")); // false
console.log(reg1.test("1ab1")); // false

// 2.+ 表示出现至少一次
const reg2 = /^\d+$/; // => 表示字符串至少出现一次数字字符
console.log(reg2.test("")); // false
console.log(reg2.test("1")); // true
console.log(reg2.test("12")); // true
console.log(reg2.test("123")); // true

// 3.? 表示出现 0~1 次
const reg3 = /^\d?$/; // => 表示字符串只能出现0或者1位数字字符
console.log(reg3.test("")); // true
console.log(reg3.test("1")); // treu
console.log(reg3.test("12")); // false

// 4.{n} 表示指定出现 n 次
const reg4 = /^\d{3}$/; // => 表示指定开头到结尾的数字字符长度为3个
console.log(reg4.test("")); // false
console.log(reg4.test("12")); // false
console.log(reg4.test("1a")); // false
console.log(reg4.test("1aa")); // false
console.log(reg4.test("123")); // true

// 5.{n,} 表示出现至少 n 次
const reg5 = /^\d{2,}$/; // => 表示字符串只能由 2~n 个数字字符组成
console.log(reg5.test("")); // false
console.log(reg5.test("1")); // false
console.log(reg5.test("12")); // true
console.log(reg5.test("123")); // true

// 6.{n,m} 表示至少出现 n~m 范围的次数
const reg6 = /^\d{2,4}$/; // => 表示字符串只能出现 2~4 个数字字符串组成
console.log(reg6.test("")); // false
console.log(reg6.test("1")); // false
console.log(reg6.test("12")); // true
console.log(reg6.test("123")); // true
console.log(reg6.test("1234")); // true
console.log(reg6.test("12345")); // false
