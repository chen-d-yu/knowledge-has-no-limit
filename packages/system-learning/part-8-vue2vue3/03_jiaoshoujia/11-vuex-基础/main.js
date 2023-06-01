import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
