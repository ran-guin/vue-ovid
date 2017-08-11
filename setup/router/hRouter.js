import Vue from 'vue'
import Router from 'vue-router'

import PublicHeader from '@/components/PublicHeader'
import PrivateHeader from '@/components/PrivateHeader'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: PublicHeader
    },
    {
      path: '/main',
      name: 'Main',
      component: PublicHeader
    },
    {
      path: '/user',
      name: 'User',
      component: PublicHeader
    },
    {
      path: '/ovid',
      name: 'OVID',
      component: PrivateHeader
    },
    {
      path: '/login',
      name: 'Login',
      component: PublicHeader
    }
  ]
})

export default router
