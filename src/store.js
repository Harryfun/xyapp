import Vue from 'vue'
import Vuex from 'vuex'
import { checkLoc } from '@/utils/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: checkLoc('userToken'),
    userInfo: checkLoc('userInfo'),
    loadShow: false,
    dateInfo: checkLoc('dateInfo'),
    hotelInfo: checkLoc('hotelInfo'),
    airInfo: checkLoc('airInfo')

  },
  mutations: {
    // 存储用户信息
    changeToken (state, item) {
      state.userToken = item.userToken
      state.userInfo = item.userInfo
    },
    // 更改loading状态
    changeload (state, item) {
      state.loadShow = item
    },
    SAVE_DATE (state, item) {
      state.dateInfo = item
      localStorage.dateInfo = JSON.stringify(item)
    },
    SAVE_HOTEL (state, item) {
      state.hotelInfo = item
      localStorage.hotelInfo = JSON.stringify(item)
    },
    SAVE_AIR (state, item) {
      state.airInfo = item
      localStorage.airInfo = JSON.stringify(item)
    }
  },
  actions: {

  }
})
