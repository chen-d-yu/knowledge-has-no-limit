/*
举个一个简单的例子来说，当我们在浏览视频或者博客论坛之类的网站时，遇到感兴趣的up主或者博主，
我们通常会选择去订阅他们的频道或者内容。 这样一来，每当他们发布一个新的内容， 
网站平台方就会通过某种渠道来通知我们， 我们便可以在第一时间了解到这一讯息， 
至于是否选择第一时间阅读，则却决于我们自己，而这就是一个典型的订阅发布模式。

反过来思考一下，倘若不使用发布订阅模式， 当我们想了要解某一些特定信息时， 
就需要自己定期的去访问信息平台，查看对方是否更新了新的内容。
而这样一来，就会产生一些不必要的时间开支。（定期的访问信息源，查看是否发生更新事件，这种方式也称为 轮询 ）

类似vue2中的 $emit 和 $on 也是这么类似做法的
本案例根据上一个案例进行修改

可以通过发布订阅实现解耦合，但是这种做法触发机制是需要用户触发，能不能自动触发，完成条件自动触发
*/

const fs = require("fs");
const { resolve } = require("path");

const events = {
  arr: [], // 订阅中心
  obj: {}, // 数据中心
  on(cb) {
    this.arr.push(cb);
  },
  emit(key, val) {
    this.obj[key] = val;
    this.arr.forEach((cb) => {
      cb(this.obj);
    });
  },
};

events.on(() => {
  // 监听每次触发逻辑
  console.log("每次读取完毕触发当前函数");
});

events.on((data) => {
  // 监听所有数据读取完毕，完成发布订阅系列事件
  if (Reflect.ownKeys(data).length === 2) {
    console.log("done~~");
    console.log(data);
  }
});

fs.readFile(resolve(__dirname, "file.txt"), "utf8", (err, data) => {
  events.emit("message", data);
});

fs.readFile(resolve(__dirname, "file2.txt"), "utf8", (err, data) => {
  events.emit("age", data);
});
