import Vue from 'vue'
import VueRouter from 'vue-router'
import Page4 from '@/views/Page4'
import Page3 from '@/views/Page3'
import Home from '@/views/Home'
import Form from '@/views/Form'
import Selection from '@/views/Selection'
import RetrievedData from '@/views/RetrievedData'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Introduction',
    name: 'Page4',
    component: Page4
  },
  {
    path: '/Welcome',
    name: 'Page3',
    component: Page3
  },
  {
    path: '/Selection',
    name: 'Selection',
    component: Selection
  },
  {
    path: '/Form',
    name: 'Form',
    component: Form
  },
  {
    path: '/Confirmation',
    name: 'RetrievedData',
    component: RetrievedData
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
