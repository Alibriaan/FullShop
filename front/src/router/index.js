import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import authorizationRegistration from "../views/authorizationRegistration.vue";
import verificationPage from "../views/Confirmation.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/authorization-registration",
    name: "Authorization-Registration",
    component: authorizationRegistration
  },
  {
    path: "/confirmation/:verificationToken",
    name: "Confirmation page",
    component: verificationPage
  },
  {
    path: '/posts',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
