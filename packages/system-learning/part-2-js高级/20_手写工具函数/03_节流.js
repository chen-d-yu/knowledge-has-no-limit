/*
节流：
依然用游戏来举例子，lol的技能cd就好比节流，在技能cd的过程中，只有时间到了，才能触发技能
节流是控制频率，在一定时间内，按照固定频率只会触发一次

要点：
1.判断事件触发时，是否在间隔内，小于间隔，不触发，大于间隔，触发事件
2.当前触发事件的时间，减去上一次触发事件的时间，如果是大于delay的话，就触发节流，并且把上一次的时间节点赋值为当前触发事件的时间
  核心是pre=0，那now - pre永远会大于delay，所以第一次会执行，然后赋值pre = now
  假设delay是一小时，也就是60*60*1000毫秒，如果当前时间是9点整触发的时间，那么就会有下面式子
  now - pre = 9-0 = 9 > delay 并且 pre = now = 9
  所以第一次会执行
  然后隔了半小时后再触发事件，pre = 9，now = 9.5，得到下面式子
  now - pre = 0.5 => 0.5*60*1000
  它是小于delay的，所以不会执行，也就不会修改pre的值

3.还有一种写法，使用setTimeout来实现的
  也就是timer如果有值的情况下，那么就是存在事件而且是宏任务等待执行，那就不执行函数，直接终止函数后续，等时间到了，由setTimeout去调用执行事件回调
  如果timer没有值，就说明宏任务setTimeout是空的，可以执行事件，并且在执行最后时，让timer为初始值null，就会进入下一个循环
  

节流的应用场景：
1.游戏cd，攻击频率(攻速)
2.监听页面滚动
3.鼠标移动
4.用户频繁点击事件

节流需求拆解：
1.按照固定频率执行一次
2.立即执行
3.
*/

function throttle(fn, delay, immediately = false) {
  // 1.基本实现，按照固定频率执行一次

  if (immediately) {
    // 时间戳写法
    let pre = 0;
    return function (...args) {
      const now = new Date().getTime();
      const waitTime = delay - (now - pre); // 相当于 delay - now - pre > 0 表示在间隔时间小于延迟时间，不执行，delay - now - pre <= 0 表示不在间隔时间，触发函数执行
      if (waitTime <= 0) {
        fn.apply(this, args);
        pre = now;
      }
    };
  } else {
    // 计时器写法
    let timer;
    return function (...args) {
      if (timer) {
        return;
      }

      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    };
  }
}
