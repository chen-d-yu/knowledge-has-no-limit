var foo = "123";
var foo1 = 123;
// ==值等 在类型不同的情况下，会先将运算元转成Number值，再进行比较
// 缺点是不能区分0和false、""和false这类的比较运算
console.log(foo == foo1); // true
// ===全等 在类型不同，直接返回false
console.log(foo === foo1); // false
