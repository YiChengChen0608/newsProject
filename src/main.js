import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DatePicker, Select, Option } from 'element-ui'
import 'normalize.css'

Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
