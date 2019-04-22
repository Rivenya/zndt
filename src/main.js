import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引用字体图标
import './assets/icon/iconfont.css'
//引用animate
import 'animate.css'
// 引用自己封装的axios,把post和get挂载到Vue的原型对象上面
import { post, get } from './axiosFZ'
Vue.prototype.$post = post
Vue.prototype.$get = get
//引用echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
