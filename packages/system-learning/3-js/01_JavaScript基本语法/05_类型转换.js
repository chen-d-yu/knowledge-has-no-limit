// 转String
var num = 1;
var bool = true;
var str = "字符串";

// a.隐式转换，使用+运算符，在运算过程中，js会将另外一个变量隐式转成字符串，然后相加
console.log(num + "", bool + "", str + ""); // 1 true 字符串

// b.显示转换
console.log(String(num), String(bool), String(str)); // 1 true 字符串

// 转Number
var num1 = "8";
var num2 = "4";

// a.隐式转换，js会将除了+之外的运算符的两个变量，会隐式转成Number类型，然后再进行计算
console.log(num1 / num2); // 2
console.log(num1 - num2); // 4
console.log(num1 * num2); // 32
console.log(num1 < num2); // false

// b.显示转换
console.log(Number(num1)); // 8
console.log(Number(num2)); // 4
console.log(Number(null)); // 4
/*
  其他类型转Number规则
  1.undefined => NaN
  2.null,[],"",'' => 0
  3.true => 1，false => 0
  4.string开头包含数字的，比如123abc => 123，abc123 => NaN
*/

// 转Boolean
/*
  其他类型转Boolean规则，隐式和显示转换都遵循这个规则
  1.0,"",'',undefined,NaN => false，除此之外其他都是 => true
*/

// a.隐式转换，if判断会进行隐式转换，然后再进行分支判断
var num = 123;
var str = "转boolean";
if (num) {
  console.log("进入分支");
}

// b.显示转换
console.log(Boolean(num), Boolean(str), Boolean([]), Boolean("")); // true true true false
// c.ES6语法 !! 转换
console.log(!!num, !!str, !![], !!""); // true true true false
