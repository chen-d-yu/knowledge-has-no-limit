/*
深浅拷贝
浅拷贝只会复制对象或数组的第一层属性，如果属性的值还是对象或数组，那么它们之间的引用关系并不会改变。相反，深拷贝会完全复制对象或数组的所有属性，并创建新的引用关系。
当我们复制一个对象或数组时，如果我们只是复制它们的地址，那么原来的对象或数组和新的对象或数组都指向同一个地址，对其中一个对象或数组的修改会影响另一个对象或数组，这种复制方式称为浅拷贝。
为了避免这种情况，我们需要进行深拷贝，即复制对象或数组的值，而不是复制地址。


发生浅拷贝的操作有：
- 拓展运算符 ... 
- Object.assign()
- 利用对象的构造属性

深拷贝的操作：
- lodash(鲁大师)
- JSON序列化，这种方式有很多弊端，比如无法处理函数、正则表达式和其他对象，对值为undefined的属性忽略拷贝，原型链丢失，无法处理对象循环引用等等。。
- 递归算法

*/

// 浅拷贝
function shallowClone(obj) {
  // 1.使用内置构造函数
  if (obj === null || typeof obj !== "object") {
    // 常规值直接返回
    return obj;
  }
  let clone = new obj.constructor();
  for (let key in obj) {
    clone[key] = obj[key];
  }
  return clone;
  // 2.拓展运算符
  // return { ...obj };
  // 3.Object.assign()
  // return {
  //   ...Object.assign({}, obj),
  // };
}

// 深拷贝

// 2.递归算法
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}

const specialObjName = ["Map", "Set"];

// 2.1.基本实现
const deepClone1 = function (oldObj) {
  if (!isObject(oldObj)) {
    // 1.如果是基础值直接返回
    return oldObj;
  }

  const newObj = {};
  for (const key in oldObj) {
    // 2.如果是对象，拷贝一个新的对象，并复制oldObj的值
    newObj[key] = deepClone1(oldObj[key]);
  }
  return newObj;
};

// 2.2.数组拷贝
const deepClone2 = function (oldObj) {
  if (!isObject(oldObj)) {
    return oldObj;
  }

  // 3.如果是数组类型，创建新的数组，如果不是，则为对象
  const newObj = Array.isArray(oldObj) ? [] : {};
  for (const key in oldObj) {
    newObj[key] = deepClone2(oldObj[key]);
  }
  return newObj;
};

// 2.3.其他类型，函数、set、map
const deepClone3 = function (oldObj) {
  if (!isObject(oldObj)) {
    return oldObj;
  }
  // 4.Set类型
  // 5.Map类型
  if (specialObjName.includes(oldObj[Symbol.toStringTag])) {
    const specialObj = new oldObj.constructor();

    for (const item of oldObj) {
      oldObj[Symbol.toStringTag] === "Set"
        ? specialObj.add(deepClone3(item))
        : specialObj.set(...item);
    }
    return specialObj;
  }

  // 6.函数类型，直接赋值
  if (typeof oldObj === "function") {
    return oldObj;
  }

  const newObj = Array.isArray(oldObj) ? [] : {};
  for (const key in oldObj) {
    newObj[key] = deepClone3(oldObj[key]);
  }
  return newObj;
};

// 2.4.Symbol类型
const deepClone4 = function (oldObj) {
  // 7.如果值是symbol，创建新的symbol
  if (typeof oldObj === "symbol") {
    return Symbol(oldObj.description);
  }

  if (!isObject(oldObj)) {
    return oldObj;
  }
  if (specialObjName.includes(oldObj[Symbol.toStringTag])) {
    const specialObj = new oldObj.constructor();

    for (const item of oldObj) {
      oldObj[Symbol.toStringTag] === "Set"
        ? specialObj.add(deepClone4(item))
        : specialObj.set(...item);
    }
    return specialObj;
  }

  if (typeof oldObj === "function") {
    return oldObj;
  }

  const newObj = Array.isArray(oldObj) ? [] : {};
  for (const key in oldObj) {
    newObj[key] = deepClone4(oldObj[key]);
  }

  // 7.1.如果key是symbol类型，单独拿到所有symbol的keys，然后遍历
  const symbolKeys = Object.getOwnPropertySymbols(oldObj);
  for (const item of symbolKeys) {
    console.log(item);
    newObj[Symbol(item.description)] = deepClone4(oldObj[item]);
  }
  return newObj;
};

// 2.5循环引用烧脑，不看
