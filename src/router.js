import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GLYHome from './views/GLYHome.vue'
import Register from './views/register.vue'
import Yhxy from './components/yhxy.vue'
import Znctgly from './views/znctgly.vue'
import Znctuser from './views/znctuser.vue'
import Znctusercontent from './components/znctuserContent.vue'
import Znctusercontent2 from './components/znctuserContent2.vue'
import Znctusercontent3 from './components/znctuserContent3.vue'
import Znctusercontent4 from './components/znctuserContent4.vue'
import Znctusercontent5 from './components/znctuserContent5.vue'
import Znctusercontent5sjzs from './components/znctuserContent5sjzs.vue'
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
    {
      path: '/znctgly',
      name: 'znctgly',
      component: Znctgly,
      meta: { requiresAuth: true }
    },
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
          component: Znctusercontent
        },
        {
          path: 'znctusercontent2',
          name: 'znctusercontent2',
          component: Znctusercontent2
        },
        {
          path: 'znctusercontent3',
          name: 'znctusercontent3',
          component: Znctusercontent3
        },
        {
          path: 'znctusercontent4',
          name: 'znctusercontent4',
          component: Znctusercontent4
        },
        {
          path: 'znctusercontent5',
          name: 'znctusercontent5',
          component: Znctusercontent5
        },
        {
          path: 'znctusercontent5sjzs',
          name: 'znctusercontent5sjzs',
          component: Znctusercontent5sjzs
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
