import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
    }
  ]
})

export default routes