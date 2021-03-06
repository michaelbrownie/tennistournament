import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import Poule from '../components/Poule/Poule'
import Knockout from '../components/Knockout/Knockout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/poule',
      name: 'Poule',
      component: Poule
    },
    {
      path: '/knockout',
      name: 'Knockout',
      component: Knockout
    }
  ]
})
