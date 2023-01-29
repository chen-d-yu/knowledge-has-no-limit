/*
what-promise是干什么的
解决回调嵌套地狱的问题，如果有多个异步回调，下一个回调依赖上一个回调的输出，
就会一直嵌套下去，代码难以维护，巨几把恶心，而且错误处理无法统一

可以使用promise包装处理，解决上面的问题，但是promise也是基于回调处理，可能还是会有嵌套问题
*/

const p = new Promise((resolve, rejcet) => {
  console.log("executor");
  setTimeout(() => {
    resolve("成功");
  }, 100);
  // throw new Error("失败");
});
/*
Promise是一个类，传入一个参数 executor 执行器函数，这个函数会跟着主线程立即执行
executor函数又有两个参数，resolve，reject
异步的处理使用resolve返回异步结果

1.promise有三个状态，fulfilled成功 reject失败 pending等待
2.每个promise都有then方法，可以访问到成功的值和失败的原因
3.promise内部可以使用resolve和reject改变状态，状态是不可逆的，就是成功和失败只能存在一个，优先抛出异常
4.当执行器发生异常时，也会触发reject，那就不能触发resolve
 */
// p.then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });
