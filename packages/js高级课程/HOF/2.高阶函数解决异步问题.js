const fs = require("fs");
const { resolve } = require("path");
const obj = {};

// 由于文件读写io是异步的，上面的两个读文件操作，不知道谁先谁后，客户端不能同时拿到异步回调结果
// 下面这个函数，类似发布订阅的基础版回调函数，当完成了全部读取文件的操作，才去通知cb回调
function cb(key, val) {
  obj[key] = val;
  if (Reflect.ownKeys(obj).length === 2) {
    console.log("完成", obj);
  }
}

const cb2 = after(2, (obj) => {
  console.log(obj);
});

function after(times, cb) {
  let obj = {};
  return function (key, val) {
    obj[key] = val;
    if (--times === 0) {
      cb(obj);
    }
  };
}

fs.readFile(resolve(__dirname, "file.txt"), "utf8", (err, data) => {
  cb("message", data);
  cb2("message", data);
});

fs.readFile(resolve(__dirname, "file2.txt"), "utf8", (err, data) => {
  cb("age", data);
  cb2("age", data);
});
