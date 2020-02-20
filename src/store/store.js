import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// Vue.prototype.$http = axios

const resourceHost = 'http://localhost'

const enhanceAccessToeken = () => {
    const {accessToken} = localStorage
    if (!accessToken) return
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  enhanceAccessToeken()

export const store = new Vuex.Store({

    state: {
        accessToken: localStorage.getItem('accessToken')
    },
    
    actions: {
        MLOGIN ({commit}, payload) {
            // alert(payload.accessToken)
            commit('MLOGIN', payload.accessToken)
        },

        LOGOUT ({commit}) {
            // HTTP 요청 헤더값 제거
            axios.defaults.headers.common['Authorization'] = undefined
            commit('LOGOUT')
          }
    },
    mutations: {
        MLOGIN (state, accessToken) {
            // alert(accessToken)
            state.accessToken = accessToken
            alert(state.accessToken)
            localStorage.accessToken = accessToken
        },
        LOGOUT (state) {
            state.accessToken = null
            delete localStorage.accessToken
        }
    }
})