/**
 * 高阶函数的定义：一个函数返回一个函数，就是高阶函数
 * 一个函数的参数是一个函数这样也是高阶函数
 *
 *
 */

function a() {
  return () => {};
}

function fn(cb) {}
fn(() => {});

// --------应用---------
function core(a, b, c, d) {
  console.log("核心代码");
  console.log(a, b, c, d);
}

core.before = function (cb) {
  return (...args) => {
    cb();
    this(...args); // 指向core
  };
};

const newCore = core.before(() => {
  console.log("拓展一下");
});
newCore(1, 2, 3, 4);
// --------保留参数-------
// 案例一：判断变量类型
function isType1(typing, value) {
  return Object.prototype.toString.call(value) === typing;
}
console.log(isType1("Array", []));
console.log(isType1("Number", 12));
console.log(isType1("String", "ab"));
console.log(isType1("Object", {}));
// 上面的这种做法，是最基础的做法，但是如果多个类型的话，就要传递类型和值，如果值不同，也需要传递两个参数
// 会有一种复杂冗余的做法，接下来改造成下面的写法，将typing保存起来，后面使用的isNumber、isString等函数
// 一直都能取到typing参数
function isType(typing) {
  return (value) => {
    return Object.prototype.toString.call(value) === `[object ${typing}]`;
  };
}

const isNumber = isType("Number");
const isString = isType("String");
const isObject = isType("Object");

console.log(isNumber(1));
console.log(isNumber("1"));
console.log(isString("1"));
console.log(isObject({}));
