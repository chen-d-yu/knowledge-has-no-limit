/*
事件总线，在react中就是redux的功能，跨组件或者跨页面通信
- uniapp有官方的跨页面通信
- vue有vuex
- react有react-redux
- 小程序垃圾没有

事件总线基本就是发布订阅模式的实现！！

*/

class EventBus {
  constructor() {
    this.nameMap = {};
  }
}
