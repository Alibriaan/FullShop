import Vue from 'vue'
import Vuex from 'vuex'
import basketModule from "./modules/basket.js";
import productionModule from "./modules/production.js";
import sessioModule from "./modules/session.js";
import userModule from "./modules/user.js";

Vue.use(Vuex)

// const getSession = () => {
//   const v = document.cookie.match('(^|;) ?' + "Session" + '=([^;]*)(;|$)');
//   return v ? v[2] : null;
// }

export default new Vuex.Store({
  modules: {
    basketModule,
    productionModule,
    sessioModule,
    userModule
  }
})


// state: {
//   email: "",
//   password: "",
//   listOfItem: "",
//   sessionID: getSession()
// },
// mutations: {
// },
// actions: {
// },
// modules: {
// }