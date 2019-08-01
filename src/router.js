import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/strategyList',
      name: 'strategyList',
      component: () =>
        import('./views/StrategyList.vue')
    },
    {
      path: '/strategy/:id',
      name: 'strategy',
      component: () =>
        import('./views/Strategy.vue')
    }
  ]
})
