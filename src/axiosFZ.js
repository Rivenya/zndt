import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import QS from 'qs'
import store from './store.js'
Vue.use(VueAxios, axios)

// 封装axios
// 设置延迟时间
axios.defaults.timeout = 5000
// 设置请求地址
axios.defaults.baseURL = 'http://localhost/zndtjk'
//设置请求的时候可以带cookie
// axios.defaults.withCredentials = true

//http请求拦截器,把响应加个响应头和调整格式，把JSON转成JSON字符串传过去
axios.interceptors.request.use(
  config => {
    // 数据用qs转换
    config.data = QS.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // 判断头部要不要加authorition
    if (config.url !== 'login.php' && config.url !== 'register.php') {
      // 判断有没有token
      if (localStorage.getItem('token')) {
        config.headers.Authorization = localStorage.getItem('token')
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // if (error.response.data === 401) {
    //   router.replace({
    //     path: '/login',
    //     query: {
    //       redirect: router.currentRoute.fullPath
    //     }
    //   })
    // }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    Vue.axios
      // 传入url和参数
      .get(url, { params: data })
      // 成功调用resolve方法
      .then(response => {
        resolve(response)
      })
      // 失败调用reject
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    // qs处理下传入的data
    Vue.axios
      .post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// ------ -------------- router钩子函数
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (
    to.path === '/glyhome' ||
    to.path === '/register' ||
    to.path === '/yhxy'
  ) {
    next()
  } else {
    post('yanzhenglogin.php').then(response => {
      // 判断登录信息过期没有,同时权限隔离
      if (response.data.errCode === 401 || response.data.errCode === 404) {
        // 清除本地token
        window.localStorage.removeItem('token')
        //  跳转路由
        router.push({
          path: '/'
        })
      }
      if (to.path === '/' && window.localStorage.getItem('token')) {
        if (response.data.power === '1') {
          router.push({
            path: '/znctgly'
          })
        } else if (response.data.power === '0') {
          router.push({
            path: '/znctuser'
          })
        }
        next()
      } else if (to.path === '/znctgly' && response.data.power !== '1') {
        router.push({
          path: '/'
        })
      } else if (to.path === '/znctuser' && response.data.power !== '0') {
        router.push({
          path: '/'
        })
      }
      // 数据保存到session
      window.sessionStorage.setItem('id', response.data.id)
      window.sessionStorage.setItem('name', response.data.name)
      window.sessionStorage.setItem('avatar', response.data.avatar)
      store.commit('addUserInfo', {
        name: window.sessionStorage.getItem('name')
      })
    })
    next()
  }
})
