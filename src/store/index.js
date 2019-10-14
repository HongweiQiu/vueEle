import Vue from 'vue'
import Vuex from 'vuex'

import cnode from './cnode'
import user from './user'
import sign from './../../static/js/setting.js'
import http from './../../config/apiUrl.js'
Vue.use(Vuex)

// export default new Vuex.Store({
//   strict: process.env.NODE_ENV !== 'production',
//   modules: {
//     cnode,
//     user
//   },

// })
const store = new Vuex.Store({
	 strict: process.env.NODE_ENV !== 'production',
  modules: {
    cnode,
    user
  },
  state: {
   show:true
  },
  mutations: {

   IsShow(state){
   	state.show=!state.show
   }
    
  }
})

export default store;