import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getSession = () => {
  const v = document.cookie.match('(^|;) ?' + "Session" + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    sessionID: getSession()
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
