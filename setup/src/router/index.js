import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Main from '@/components/Main'

import User from '@/components/User'

import Visit from '@/components/ovid/Visit'

import Login from '@/components/Standard/Login'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/ovid',
      name: 'Visit',
      component: Visit
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router
