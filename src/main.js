import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import * as filters from './filters'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import fullCalendar from 'vue-fullcalendar'
import '@/permission' // 权限
import '@/mock'

Vue.use(ElementUI)
Vue.component('full-calendar', fullCalendar)
// register global utility filters.
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
