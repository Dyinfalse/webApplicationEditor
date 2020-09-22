import Vue from 'vue'
import VueRouter from 'vue-router'
import Designer from '../views/Designer';
import Login from '../components/graceComponents/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/designer'
  },
  {
    path: '*',
    redirect:'/designer'
  },
  {
    path: '/designer',
    name: 'designer',
    component: Designer,
    children: [
      /**
       * 所有设计器产生的页面都在这个下面
       */
    ]
  }
]


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
