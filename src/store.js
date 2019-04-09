import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义全局token接收token
    token: ''
  },
  mutations: {
    // 登录的时候改变token
    loginChangeToken(state, n) {
      state.token = n
    }
  },
  actions: {}
})
