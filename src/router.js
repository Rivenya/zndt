import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GLYHome from './views/GLYHome.vue'
import Register from './views/register.vue'
import Yhxy from './components/yhxy.vue'
import Znctgly from './views/znctgly.vue'
import ZnctglyCon1 from './components/znctglyCon1.vue'
import ZnctglyCon2 from './components/znctglyCon2.vue'
import ZnctglyCon3 from './components/znctglyCon3.vue'
import ZnctglyCon4 from './components/znctglyCon4.vue'
import ZnctglyCon5 from './components/znctglyCon5.vue'
import ZnctglyCon6 from './components/znctglyCon6.vue'
import Znctuser from './views/znctuser.vue'
import Znctusercontent from './components/znctuserContent.vue'
import Znctusercontent2 from './components/znctuserContent2.vue'
import Znctusercontent3 from './components/znctuserContent3.vue'
import Znctusercontent4 from './components/znctuserContent4.vue'
import Znctusercontent5 from './components/znctuserContent5.vue'
import Znctusercontent5sjzs from './components/znctuserContent5sjzs.vue'
import yhSet from './views/yhsetting.vue'
import Error from './views/404.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/glyhome',
      name: 'glyhome',
      component: GLYHome
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () =>
      //   import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/yhxy',
      name: 'yhxy',
      component: Yhxy
    },
    //管理员路由
    {
      path: '/znctgly',
      name: 'znctgly',
      component: Znctgly,
      meta: { requiresAuth: true },
      redirect: '/znctgly/znctglyCon1',
      children: [
        {
          path: 'znctglyCon1',
          name: 'znctglyCon1',
          component: ZnctglyCon1
        },
        {
          path: 'znctglyCon2',
          name: 'znctglyCon2',
          component: ZnctglyCon2
        },
        {
          path: 'znctglyCon3',
          name: 'znctglyCon3',
          component: ZnctglyCon3
        },
        {
          path: 'znctglyCon4',
          name: 'znctglyCon4',
          component: ZnctglyCon4
        },
        {
          path: 'znctglyCon5',
          name: 'znctglyCon5',
          component: ZnctglyCon5
        },
        {
          path: 'znctglyCon6',
          name: 'znctglyCon6',
          component: ZnctglyCon6
        }
      ]
    },
    //用户路由
    {
      path: '/znctuser',
      name: 'znctuser',
      component: Znctuser,
      meta: { requiresAuth: true },
      redirect: '/znctuser/znctusercontent',
      children: [
        {
          path: 'znctusercontent',
          name: 'znctusercontent',
          component: Znctusercontent,
          meta: { quanxian: 'user' }
        },
        {
          path: 'znctusercontent2',
          name: 'znctusercontent2',
          component: Znctusercontent2,
          meta: { quanxian: 'user' }
        },
        {
          path: 'znctusercontent3',
          name: 'znctusercontent3',
          component: Znctusercontent3,
          meta: { quanxian: 'user' }
        },
        {
          path: 'znctusercontent4',
          name: 'znctusercontent4',
          component: Znctusercontent4,
          meta: { quanxian: 'user' }
        },
        {
          path: 'znctusercontent5',
          name: 'znctusercontent5',
          component: Znctusercontent5,
          meta: { quanxian: 'user' }
        },
        {
          path: 'znctusercontent5sjzs',
          name: 'znctusercontent5sjzs',
          component: Znctusercontent5sjzs,
          meta: { quanxian: 'user' }
        }
      ]
    },
    {
      path: '/yhsetting',
      name: 'yhsetting',
      component: yhSet,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
