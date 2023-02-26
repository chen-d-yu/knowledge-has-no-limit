// 声明变量
// 1.声明单个变量
var time = "2023-02-04 11:06:03";

// 2.声明多个变量
var year = "2023",
  month = "02",
  day = "04";

// 3.先声明后赋值（不推荐）
var hour, minutes;
hour = "11";
minutes = "06";

// 4.只声明不赋值（不赋值的话，默认值是undefined，开发中只在特定场景允许，比如不知道后续的变量类型和变量值时）
var today;

/**
 * 变量练习
 */
var city = "广州";
var counter = "番禺区";

// 修改变量
city = "深圳";
counter = "龙华";
// 访问变量
console.log(city); // 深圳

// 变量赋值给另外一个变量
var city2 = city;
console.log(city2); // 深圳

var a = 1;
var b = 2;

// 变量交换
// 使用临时变量
// var temp;
// temp = a;
// a = b;
// b = temp;

// 不适用临时变量
// a = a + b; // a: 3，b: 2
// b = a - b; // a: 3, b: 1
// a = a - b; // a: 2, b: 1

// ES6交换
// [a, b] = [b, a];

console.log(a, b);

var obj;
console.log(obj);
