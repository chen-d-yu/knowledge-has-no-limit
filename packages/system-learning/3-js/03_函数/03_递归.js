// 递归实现n的m次幂
function pow(x, n) {
  if (n === 1) {
    return x;
  }
  return x * pow(x, n - 1);
}

console.log(pow(2, 3));

/*
简单来拆解一下
x = 2 , n = 3
第一次：2 * pow(2,2) = 8
第二次：2 * pow(2,1) = 4
第三次：2 * 2
*/

// 斐波那契
function fibo(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibo(n - 1) + fibo(n - 2);
}

/*
拆解过程 ：
fibo(5) = fibo(4) + fibo(3) = 3 + 2
fibo(4) = fibo(3) + fibo(2) = 2 + 1
fibo(3) = fibo(2) + fibo(1) = 1 + 1
fibo(2) = 1
fibo(1) = 1
*/

console.log(fibo(5)); // 5
