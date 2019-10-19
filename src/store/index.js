import Vue from 'vue'
import Vuex from 'vuex'
import cnode from './cnode'
import user from './user'
import nozzle from './interface/website.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	 strict: process.env.NODE_ENV !== 'production',
  modules: {
   nozzle
  },
  state: {
   firstMenu:localStorage.getItem('一级菜单'),
   secondMenu:localStorage.getItem('二级菜单'),
   showNum:[10,15,20,25],//总部每页显示的数量
   show:true,
   count:45
  },
  mutations: {
    example(state){
      state.count++;
    },
   IsShow(state){
   	state.show=!state.show
   }
    
  }
})

export default store;