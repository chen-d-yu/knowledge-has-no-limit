function debounce(fn, wait = 50, immediate) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)

    // ------ 新增部分 start ------
    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    // ------ 新增部分 end ------

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}

export {
  debounce,
  throttle
}