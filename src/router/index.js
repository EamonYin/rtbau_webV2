import { createRouter, createWebHashHistory } from 'vue-router'
import guide from '../views/EamonPlanet.vue'
const routes = [
  {
    path: '/',
    redirect: '/guide'
  },
  {
    path: '/guide',
    name: 'guide',
    component: guide
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router