import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Basket from '../views/Basket.vue';

import authorizationRegistration from "../views/authorizationRegistration.vue";
import verificationPage from "../views/Confirmation.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true
    } 
  },
  {
    path: "/authorization-registration",
    name: "Authorization-Registration",
    component: authorizationRegistration,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: false
    } 
  },
  {
    path: "/confirmation/:verificationToken",
    name: "Confirmation page",
    component: verificationPage,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: false
    } 
  },
  {
    path: "/catalog/:id",
    name: "Catalog",
    component: Catalog,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true
    },
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true
    },
  },
]

const router = new VueRouter({
  routes
})

export default router
