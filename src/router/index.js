import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/Home/Home' // Home base page
import Home from '../components/Home/Home'
//import Community from '@/components/Community/Community' // Community base page


Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
