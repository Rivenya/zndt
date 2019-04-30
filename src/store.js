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
      avatar: window.sessionStorage.getItem('avatar'),
      searchId:null
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
    },
    //改变搜索id的数据
    changeSearchId(state,n){
      state.searchId = n
    }
  },
  getters: {
    getUserName: state => {
      return state.userInfo.name
    }
  }
})
