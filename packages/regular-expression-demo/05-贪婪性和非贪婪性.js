// 当给定一个符号使用限定符时，会尽可能多得去捕获内容，那么这个就是正则的贪婪性
// 正则在捕获的时候，尽可能按照最小值来捕获，也就是在写限定符的时候，在结尾多加一个 ?

// 1.+[?按照最小长度捕获]
const reg1 = /\d+/; // => 捕获至少一个数字到最大能匹配上的数字长度
const reg2 = /\d+?/; // => 捕获时，尽可能获取最小长度的匹配值，

console.log(reg1.exec("123456abc")); // 匹配到了6个，true
console.log(reg2.exec("1234567123123abc")); // 匹配到了1个，true，只会捕获最小长度

// 2.*[?按照最小长度捕获]
const reg3 = /\d*/; // => 捕获最大长度的数字长度
const reg4 = /\d*?/; // => 捕获最小长度的数字长度

console.log(reg3.exec("123456abc")); // 匹配到了6个，true
console.log(reg4.exec("1234567123123abc")); // 匹配到了1个，true，只会捕获最小长度
console.log(reg4.exec("abc")); // 匹配到了0个，true，只会捕获最小长度

// 3.?[?按照最小长度捕获]  只要捕获0~1个，最大长度1，最小长度0
const reg5 = /\d?/;
const reg51 = /\d??/;
console.log(reg5.exec("abc")); // => 匹配到0个，是个空字符串，true，捕获到最小长度 0 个
console.log(reg5.exec("abc")); // => 匹配到0个，是个空字符串，true，捕获到最小长度 0 个

// 4.{n,}[?按照最小长度捕获]
const reg6 = /\d{2,}/;
const reg7 = /\d{2,}?/;
console.log(reg6.exec("123abc")); // => 匹配到3个，ture，匹配最大长度2~n次
console.log(reg7.exec("123abc")); // => 匹配到2个，ture，匹配最小长度2

// 5.{n,m}[?按照最小长度捕获]
const reg8 = /\d{2,4}/;
const reg9 = /\d{2,4}?/;
console.log(reg8.exec("1234123131abc")); // => 匹配到4个，ture，匹配最大长度2-4次
console.log(reg9.exec("1234123131abc")); // => 匹配到2个，ture，匹配最小长度2

/*
{0,} => *
{1,} => +
{0,1} => ?
*/
