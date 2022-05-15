import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const AddService = () => import('../views/freeman/AddService.vue')
const ServiceHistory = () => import('../views/freeman/ServiceHistory.vue')
const ServiceStore = () => import('../views/client/ServiceStore.vue')
const ServiceOrder = () => import('../views/client/ServiceOrder.vue')
const UserManagement = () => import('../views/employee/UserManagement.vue')
const ProjectManagement = () => import('../views/employee/ProjectManagement.vue')

Vue.use(VueRouter)

const children = [
  {
    path: '/',
    redirect: 'userManagement'
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
  },
  {
    path: 'serviceStore',
    name: 'ServiceStore',
    component: ServiceStore
  },
  {
    path: 'serviceOrder',
    name: 'ServiceOrder',
    component: ServiceOrder
  },
  {
    path: 'userManagement',
    name: 'UserManagement',
    component: UserManagement
  },
  {
    path: 'projectManagement',
    name: 'ProjectManagement',
    component: ProjectManagement
  },
]

const routes = [
  {
    path: '/user',
    name: 'Home',
    component: Home,
    children: children
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
