import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from './views/Map.vue'
import Air from './views/Air.vue'
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
    }, {
      path: '/air',
      name: 'air',
      component: Air,
      children: [
        {
          path: 'search',
          name: 'airSearch',
          component: () => import('./views/AirSearch.vue')
        },
        {
          path: 'list',
          name: 'airList',
          component: () => import('./views/AirList.vue')
        },
        {
          path: 'order',
          name: 'airOrder',
          component: () => import('./views/AirOrder.vue')
        }
      ]
    }, {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/Personal.vue')
    },
    {
      path: '/allorder',
      name: 'allorder',
      component: () => import('./views/AllOrder.vue')
    }
  ]
})
