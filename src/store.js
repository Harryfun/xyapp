import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: localStorage.userToken ? JSON.parse(localStorage.userToken) : '',
    userInfo: localStorage.userInfo ? JSON.parse(localStorage.userInfo) : '',
    loadShow: false
  },
  mutations: {
    changeToken (state, item) {
      state.userToken = item.userToken
      state.userInfo = item.userInfo
    },
    changeload (state, item) {
      state.loadShow = item
    }
  },
  actions: {

  }
})
