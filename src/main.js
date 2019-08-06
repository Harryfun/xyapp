import '@/assets/css/base.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入flexible适配 会自动加上viewport
import 'amfe-flexible/index.js'
// 按需引入vant组件
import { Tab, Tabs, Field, Divider, Notify, Swipe, SwipeItem, Lazyload, Grid, GridItem, Cell, CellGroup, List, Step, Steps, DatetimePicker, Button, IndexBar, IndexAnchor, Popup, Picker, CouponCell, CouponList, Tag } from 'vant'
import axios from 'axios'
import AMap from 'vue-amap'

Vue.use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Divider)
  .use(Notify)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(DatetimePicker)
  .use(Button)
  .use(Step)
  .use(Steps)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(Popup)
  .use(Picker)
  .use(CouponCell)
  .use(CouponList)
  .use(Tag)
axios.defaults.baseURL = 'http://127.0.0.1:1337/'

// 拦截器设置loading
// 定义一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发出之前进行一些操作
  store.commit('changeload', true)
  return config
})
// 定义一个响应拦截器
axios.interceptors.response.use(function (config) {
  // 在这里对返回的数据进行处理
  setTimeout(() => {
    store.commit('changeload', false)
  }, 1000)
  return config
})

Vue.use(AMap)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
