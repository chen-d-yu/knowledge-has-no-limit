// 返回数组长度
function getLength(arr) {
  return arr.length;
}

var arr = [1, 2, 3, 4, 5];
var len = getLength(arr);
console.log(len); // 5

// 跳出函数执行
function stopFnRun(num) {
  for (var i = 0; i < 10000; i++) {
    console.log("心在跳");
    if (i >= num) {
      return;
    }
    console.log("还有执行吗");
  }
}

var result = stopFnRun(2);
console.log(result);

// 计算矩形面积
function getArea(width, height) {
  return width * height;
}

var aera = getArea(3, 5);
console.log(aera);

// 累加器
function accumulate(count) {
  var result = 0;
  for (var i = 0; i <= count; i++) {
    result += i;
  }
  return result;
}

var sum = accumulate(50);
console.log(sum); // 1275
