import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Default from './layouts/Default.vue'
import NoSidebar from './layouts/NoSidebar.vue'
Vue.config.productionTip = false
Vue.component('default-layout',Default)
Vue.component('no-sidebar',NoSidebar)
Vue.use(VueAxios, axios)
axios.defaults.baseURL = "http://localhost:8000/api"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
