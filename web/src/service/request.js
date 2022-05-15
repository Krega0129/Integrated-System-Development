import axios from 'axios';
import Vue from 'vue';
import router from '../router';
import hot from '../utils/hot';


export default function $(config) {
  const instance = axios.create({
    baseURL: '/api',
    timeout: 60000,
  })

  instance.interceptors.request.use(
    config => {
      hot.update('loading', true)
      config.headers['authorization'] = localStorage.getItem('token')
      return config
    },
    error => {
      return Promise.reject(error);
    }
  )

  instance.interceptors.response.use(
    async res => {
      hot.update('loading', false)
      switch (res.data.code) {
        case 200:
          return res.data;
        case 401:
          await Vue.nextTick().then(() => {
            localStorage.removeItem('token')
            router.replace('/login')
          })
        default:
          hot.showErrorSnackbar(res.data.message)
          return res.data
      }
    },
    err => {
      return Promise.reject(err)
    }
  )

  return instance(config)
}