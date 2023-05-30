import Vue from 'vue'
import App from './App.vue'

// 关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 1.注册事件总线 -> School.vue 发射事件
    Vue.prototype.$bus = this
  }
}).$mount('#app')
