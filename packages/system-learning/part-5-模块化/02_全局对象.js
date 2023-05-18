// 1.process，进程对象，所有的进程信息都存在该对象中，属性argv 获取node运行时传递的参数

// 2.globalThis，在node环境指代global全局this对象  globalThis === global

// -----------特殊全局对象：模块对象------------

// 3.__dirname:表示当前文件夹的绝对路径、__filename:表示当前文件的绝对路径

// 4.module、exports、require：都是模块化的内容

// 5.定时器 setTimeout setInterval setImmediate:立即执行回调函数->process.nextTick => 事件循环篇章会说
