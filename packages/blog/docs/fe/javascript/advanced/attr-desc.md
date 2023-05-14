# 属性描述符

`Object.defineProperty(obj, prop, descriptor)`该方法允许精确地添加或修改对象的属性，可以用来精细地定义 JavaScript 对象属性的行为。

它可以通过设置不同的属性描述符，来控制属性是否支持读写、枚举、配置和是否支持 `get` 和 `set` 函数。

该方法接收三个参数：

- obj：要操作描述的对象
- prop：要的定义或修改的 属性名称 或 `Symbol`
- descriptor：要定义或修改的属性描述符

::: tip 响应式实现

Vue2的响应式原理就是使用该方法实现的

:::

## 属性描述符

属性描述符按照操作类型分为两类：

- 数据属性描述符
- 存取属性描述符

### 数据属性

**configurable**：对象是否可配置，为`false`时，不可配置、不可删除、不可修改存取属性描述符

```js
var obj = {
  name: "张三",
  age: 18,
};
Object.defineProperty(obj, "name", {
  configurable: false,
  writable: false
});

// 1.不可删除，使用删除操作符，属性还存在对象
delete obj.name;
console.log(obj);

// 2.不能修改原有的配置
//   比如当 enumerable 或 writable 是false时，不能修改为true
//   就连本身的属性 configurable 也不能修改
Object.defineProperty(obj, "name", { writable: true });

// 3.修改set和get一样会报错，因为这两个是函数属性，在 js 中，不可能存在一个相同的函数
Object.defineProperty(obj, "name", { get: function () {} });
Object.defineProperty(obj, "name", { set: function () {} });
```

**enumerable**：配置属性是否能被枚举

```js
var obj = {
  name: "张三",
  age: 18,
};

// 为false时，配置的属性无法被枚举
Object.defineProperty(obj, "addr", {
  enumerable: false,
});

console.log(Object.keys(obj)); // ['name', 'age']
```

**writable**：配置属性是否是可写属性，但属性值如果是引用类型，在发生引用更改的情况，则不会受到影响，比如数组的`push、splice`

```js
var obj = {
  name: "张三",
  age: 18,
  hobby: ["girl", "music", "sleep"]
};

Object.defineProperty(obj, "hobby", {
  writable: false,
});

// 1.属性不可写
Object.defineProperty(obj, "info", {
  writable: false,
  configurable: true,
});

obj.info = "穷凶极恶";
console.log(obj.info); // 写入不成功

// 2.引用对象不发生指向变更不会受到影响
obj.hobby.push("drink");
console.log(obj.hobby); // ['girl', 'music', 'sleep', 'drink']

// 3.不可改变引用类型的指向
obj.hobby = [];
console.log(obj.hobby); // ['girl', 'music', 'sleep', 'drink']
```

**value**：属性的值，可以是任意有效的`JavaScript`类型，默认值是`undefined`

```js
var obj = {
  name: "张三",
  age: 18
};

// 1.属性的值
Object.defineProperty(obj, "gender", {
  value: "一个真正的man",
});
console.log(obj.gender); // "一个真正的man"
```

### 存取属性

**get**：为属性提供访问对象属性的方法，访问的属性通常以`_`开头，约定俗成该属性是是私有变量，只能通过`get`方法访问

```js
var obj = {
  name: "张三",
  _time: undefined,
  _name: undefined,
};

// 1.设置get访问方法
Object.defineProperty(obj, "time", {
  configurable: true,
  enumerable: false,
  get: function () {
    return `私有属性_time，${this._time}`;
  },
});

console.log(obj.time) // "私有属性_time，undefined"
```

**set**：为属性提供修改值的方法，通常`get`和`set`是成对出现的，单独出现也没问题

```js
var obj = {
  name: "张三",
  _name: undefined,
};

// set：设置对象属性时调用的方法
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: false,
  set: function (value) {
    this._name = value;
  },
  get: function () {
    return this._name;
  },
});

obj.name = "李四";
console.log(obj.name);
```

### 其他属性描述符的操作

**获取属性描述符**：

`getOwnPropertyDescriptor`获取对象的单个属性

`getOwnPropertyDescriptors`获取对象的所有属性描述符

```js
var obj = {
  name: "张三",
  age: 18,
};

// 1.获取对象的单个属性描述符
console.log(Object.getOwnPropertyDescriptor(obj, "name"));

// 2.获取对象的所有属性描述符
console.log(Object.getOwnPropertyDescriptors(obj));
```

**批量设置属性描述符**：

`defineProperty`设置一个对象的单个属性

`defineProperties`设置一个对象的所有属性

```js
var obj = {
  name: "张三",
  age: 18
};

// 1.设置单个属性描述
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: false,
  // ...prop
});

// 2.设置多个属性描述符
Object.defineProperties(obj, {
  name: {
    configurable: true,
    enumerable: false,
    // ...prop
  },
  age: {
    // ...prop
  },
});
```

**阻止对象拓展（添加）**：`preventExtensions`阻止对象添加属性

```js
var obj = {
  name: "张三",
  age: 18,
};

// 1.阻止往对象中添加属性
Object.preventExtensions(obj);
obj.addr = "广州"; // 添加属性的操作无效，添加不成功
```

**密封对象**：不允许对象的配置，实际是将对象的每个属性的`configurable`设置为`false`

```js
var obj = {
  name: "张三",
  age: 18,
};

// 1.为每个属性设置 configurable: false
Object.seal(obj);
console.log(Object.getOwnPropertyDescriptors(obj)); 
```

**冻结对象**：设置对象为只读，实际是将对象的每个属性设置`writable = false`

```js
var obj = {
  name: "张三",
  age: 18,
};

// 1.冻结对象，将每个属性的writable设置为false
Object.freeze(obj);
console.log(Object.getOwnPropertyDescriptors(obj));
```

