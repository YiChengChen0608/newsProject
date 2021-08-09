import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      keepAlive: true
    },
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue')
  },
  {
    path: '/cardDetail',
    name: 'CardDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      keepAlive: false
    },
    component: () => import(/* webpackChunkName: "cardDetail" */ '../views/cardDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
