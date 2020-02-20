import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import HelloWorld from '@/components/HelloWorld'
import MainTable from '@/components/MainTable'
import SignUpPage from '@/components/SignUpPage'
import MyPage from '@/components/MyPage'
import BootstrapVue from 'bootstrap-vue'
import { store } from '../store/store';

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueCookies)

const requireAuth = () => (from, to, next) => {
  if (store.state.accessToken !== null) {
    return next();
  }
  // alert(store.state.accessToken)
  alert("로그인해주세욧!")  
  next('/main')
}

export default new Router({
  mode: 'history',
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
      path: '/signup',
      name: 'SignUpPage',
      component: SignUpPage
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage,
      beforeEnter: requireAuth()
    }

  ]
})
