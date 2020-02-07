import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainTable from '@/components/MainTable'
import LoginPage from '@/components/LoginPage'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'MainTable',
      component: MainTable
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }

  ]
})
