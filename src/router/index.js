import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageCtrl from '../views/PageCtrl.vue'
import BaseView from '../views/BaseView';

Vue.use(VueRouter)
let localRouter = JSON.parse(window.localStorage.getItem("router"));

const routes = localRouter || [
  {
    path: '/',
    name: 'Home',
    vue: "Home",
    component: "Home"
  },
  {
    path: '/pageCtrl',
    name: 'PageCtrl',
    vue: "PageCtrl",
    component: "PageCtrl",
    children: [
    ]
  },
  {
    path: '/about',
    name: 'About',
    vue: "About",
    component: "About"
  }
]

function setComponent (arr) {
  return arr.map(routerConifg => {
    if(routerConifg.children && routerConifg.children.length > 0){
      setComponent(routerConifg.children)
    }
    routerConifg.component = () => import("../views/" + routerConifg.vue + ".vue");
    return routerConifg;
  })
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: setComponent(routes)
})

export default router
