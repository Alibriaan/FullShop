import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Basket from '../views/Basket.vue';

import authorizationRegistration from "../views/authorizationRegistration.vue";
import verificationPage from "../views/Confirmation.vue";

//import store from "../store/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true,
      backBtn: false,
      animationStatus: true
    } 
  },
  {
    path: "/authorization-registration",
    name: "Authorization-Registration",
    component: authorizationRegistration,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: false,
      animationStatus: true

    } 
  },
  {
    path: "/confirmation/:verificationToken",
    name: "Confirmation page",
    component: verificationPage,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: false,
      animationStatus: true
    } 
  },
  {
    path: "/catalog/:id",
    name: "Catalog",
    component: Catalog,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true,
      backBtn: true,
      animationStatus: true
    },
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
    meta: {
      headerDisplay: false,
      logoutButtonDisplay: true,
      backBtn: true,
      animationStatus: true
    },
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    if(from.name === "Basket" && to.name === "Catalog") {
      router.prevRoute = "/";
    } else {
      router.prevRoute = from.fullPath;
    }
    next()
})

export default router
