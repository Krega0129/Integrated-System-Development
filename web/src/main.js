import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {vuetify} from './plugins'
import store from './store';
import hot from './utils/hot';

import './assets/css/base.css'

Vue.config.productionTip = false

Vue.prototype.$hot = hot

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
