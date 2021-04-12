import Vue from 'vue'
import Router from 'vue-router'
// 概况
const dashboard = () => import('@/views/home/dashboard')
const board = () => import('@/views/home/board')
const WebDashboard = () => import('@/views/home/WebDashboard')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/board',
      name: 'board',
      component: board,
      meta: {}
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {}
    }, {
      path: '/webdashboard',
      name: 'webdashboard',
      component: WebDashboard,
      meta: {}
    }
  ]
})
