var arr = [1, 2, 3, 4, 5];
arr.map(function (item, index) {
  return item;
});

function foo() {
  console.log("本身的函数");
  return function () {
    console.log("返回的函数");
  };
}
var bar = foo();
bar();
