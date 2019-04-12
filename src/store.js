import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义全局token接收token
    token: '',
    userInfo: {
      id: window.sessionStorage.getItem('id'),
      name: window.sessionStorage.getItem('name'),
      avatar: window.sessionStorage.getItem('avatar')
    }
  },
  mutations: {
    // 登录的时候改变token
    loginChangeToken(state, n) {
      state.token = n
    },
    // 页面加载让vuex获得数据
    addUserInfo(state, obj) {
      state.userInfo = obj
    }
  },
  getters: {
    getUserName: state => {
      return state.userInfo.name
    }
  }
})
