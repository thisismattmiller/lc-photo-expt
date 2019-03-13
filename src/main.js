import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false

import Browse from './components/Browse.vue'


const routes = [
  { path: '/', component: Browse }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')



