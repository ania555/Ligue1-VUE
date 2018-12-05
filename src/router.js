import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fixtures',
      name: 'fixtures',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "fixtures" */ './views/Fixtures.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import(/* webpackChunkName: "table" */ './views/Table.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import(/* webpackChunkName: "teams" */ './views/Teams.vue')
    }
  ]
})
