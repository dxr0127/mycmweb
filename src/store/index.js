import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false // 是否显示登录提示页
  },
  mutations: {
    setLogin (state, msg) {
      state.islogin = msg
    }
  },
  actions: {
    setLogin (context) {
      context.commit('setLogin')
    }
  }
})
