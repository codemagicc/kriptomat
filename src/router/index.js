import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingleCoin from '../views/SingleCoin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/coin/:id',
    name: 'coin',
    component: SingleCoin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
