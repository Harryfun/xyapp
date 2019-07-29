import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入flexible适配 会自动加上viewport
import 'amfe-flexible/index.js'
// 按需引入vant组件
import {
  DatetimePicker,
  Button,
  List
} from 'vant'

Vue.use(DatetimePicker)
  .use(Button)
  .use(List)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
