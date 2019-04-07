import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import QS from 'qs'
Vue.use(VueAxios, axios)
// 封装axios
// 设置延迟时间
axios.defaults.timeout = 5000
// 设置请求地址
axios.defaults.baseURL = 'http://localhost/zndtjk'

//http拦截器,把响应加个响应头和调整格式，把JSON转成JSON字符串传过去
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // 数据用qs转换
    config.data = QS.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: '/',
        querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
      })
    }
    return response
  },
  error => {
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
