import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sum: 0
  },
  actions: {
    /**
     * dispatch派发的action
     * @param content store上下文，包含commit、dispatch等方法
     * @param payload dispatch传入的值
     */
    //increment(content, payload) {
    //  content.commit('increment', payload)
    //},
    //decrement(content, payload) {
    //  content.commit('decrement', payload)
    //},
    incrementOdd(content, payload) {
      if (content.state.sum % 2) {
        content.commit('incrementOdd', payload)
      }
    },
    incrementWait(content, payload) {
      setTimeout(() => {
        content.commit('incrementWait', payload)
      }, 500)
    }
  },
  mutations: {
    /**
     * commit提交的函数，函数名和commit传入的第一个参数一致
     * @param state 当前store
     * @param payload commit提交的值
     */
    increment(state, payload) {
      state.sum += payload
    },
    decrement(state, payload) {
      state.sum -= payload
    },
    incrementOdd(state, payload) {
      state.sum += payload
    },
    incrementWait(state, payload) {
      state.sum += payload
    }
  }
})
