import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: localStorage.userToken ? JSON.parse(localStorage.userToken) : '',
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '',
    loadShow: false,
    dateInfo: {},
    hotelInfo: {}

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
    },
    SAVE_HOTEL (state, item) {
      state.hotelInfo = item
    }
  },
  actions: {

  }
})
