/*
防抖：
防抖用游戏来举例子就是，lol亮狗牌的动作，如果当前亮狗牌动作进行到一半，再亮一次狗牌，就会刷掉上一次的动作，重新开始亮狗牌的流程
防抖是控制次数，当事件触发很频繁时，函数的执行会被推迟，直到等待固定的时间，再也没有事件触发，会执行函数

防抖的应用场景：
  1.滚动事件
  2.输入事件，发送请求联想关键词
  3.事件触发频繁的事件，都能使用防抖函数


防抖的需求功能：
1.一定时间内，没有再触发事件，就执行函数；如果重新触发了事件，推迟当前的函数执行，等待时间到了，再执行函数
2.取消防抖
3.立即执行：第一次立即执行，之后的任务再做延迟，比如do while
4.获取返回值：回调函数或promise
*/

function debounce(fn, delay, immediate = false) {
  // 1.闭包存储定时器
  let timer = null;
  let invokeFlag = false;

  // 2.触发事件时调用的函数
  function handle(...args) {
    return new Promise((resolve, reject) => {
      try {
        let res = void 0;
        // 2.1.如果上一次有事件在触发中，中断它
        if (timer) {
          clearTimeout(timer);
        }

        // 4.立即执行，之后的任务再做延迟
        if (immediate && !invokeFlag) {
          res = fn.apply(this, args);
          resolve(res);
          invokeFlag = true;
          timer = null;
          return;
        }

        // 2.2.延迟去执行传入的函数
        timer = setTimeout(() => {
          // 2.3.this隐式绑定为事件调用者，并传入参数
          res = fn.apply(this, args);
          resolve(res);
          invokeFlag = false;
          timer = null;
        }, delay);
      } catch (error) {
        reject(error);
      }
    });
  }

  // 3.添加取消防抖功能
  handle.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      invokeFlag = false;
      timer = null;
    }
  };

  return handle;
}
