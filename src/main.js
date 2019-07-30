import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入flexible适配 会自动加上viewport
import 'amfe-flexible/index.js'
// 按需引入vant组件
import { Tab, Tabs, Field, Divider, Notify, DatetimePicker, Button, List } from 'vant'
import axios from 'axios'

Vue.use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Divider)
  .use(Notify)
  .use(DatetimePicker)
  .use(Button)
  .use(List)
axios.defaults.baseURL = 'http://127.0.0.1:1337/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
