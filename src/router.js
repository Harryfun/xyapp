import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './views/Map.vue'
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
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () =>
        import('./views/Calendar.vue')
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: () =>
        import('./views/Hotel.vue')
    }, {
      path: '/hotelList',
      name: 'hotelList',
      component: () => import('./views/hotelList.vue')
    }, {
      path: '/hotelDetail',
      name: 'hotelDetail',
      component: () => import('./views/hotelDetail.vue')
    }, {
      path: '/map',
      name: 'map',
      component: Map
    }
  ]
})
