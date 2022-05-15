import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const AddService = () => import('../views/freeman/AddService.vue')
const ServiceHistory = () => import('../views/freeman/ServiceHistory.vue')

Vue.use(VueRouter)

const userChildren = [
  {
    path: '/',
    redirect: 'addService'
  },
  {
    path: 'addService',
    name: 'AddService',
    component: AddService
  },
  {
    path: 'serviceHistory',
    name: 'ServiceHistory',
    component: ServiceHistory
  }
]

const routes = [
  {
    path: '/user',
    name: 'Home',
    component: Home,
    children: userChildren
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
