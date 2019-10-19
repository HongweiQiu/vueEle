// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import Axios from 'axios'
import NProgress from 'nprogress'

import sign from './../static/js/setting'//总部签名token
import websitesign from './../static/js/website'//站点签名token

import http from './../config/apiUrl.js'

import App from './App'
import store from './store'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.min.css'
import '@/assets/css/main.css'
import '@/assets/css/scrollbar.css'
import '@/assets/css/reset.css'
import 'nprogress/nprogress.css'
import 'animate.css'


import DropdownPlugin from './m/dropdown'
import NavbarPlugin from './m/navbar'
import ContextMenuPlugin from './m/context-menu'
import MButton from '@/m/button'
import MSwitch from '@/m/switch'
import MAlert from '@/m/alert'
import MCheckbox from '@/m/checkbox'
import MInput from '@/m/input'
import MLoading from '@/m/loading'
import Mkeyboard from '@/m/keyboard'
import MNumberkeyboard from '@/m/number-keyboard'
import MBox from '@/m/box'
import MBackTop from '@/m/back-top'
import MLoader from '@/m/loader'
import MContainer from '@/m/container'


Vue.prototype.$sign=sign
Vue.prototype.$websitesign=websitesign
Vue.prototype.$axios = Axios;
Axios.defaults.withCredentials =true;//请求不到cookie添加该行
Vue.prototype.http=http
Vue.use(http)
Vue.use(ElementUI)

Vue.use(DropdownPlugin)
Vue.use(NavbarPlugin)
Vue.use(ContextMenuPlugin)
Vue.use(MButton)
Vue.use(MSwitch)
Vue.use(MAlert)
Vue.use(MCheckbox)
Vue.use(MInput)
Vue.use(MLoading)
Vue.use(Mkeyboard)
Vue.use(MNumberkeyboard)
Vue.use(MBox)
Vue.use(MBackTop)
Vue.use(MLoader)
Vue.use(MContainer)

var whiteList = ['demo', 'login','w-login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  var token = localStorage.getItem('访问token')||localStorage.getItem('wv_token');
    if(to.name=='w-login'){
      localStorage.removeItem('访问token')
    }else if(to.name=='login'){
      localStorage.removeItem('wv_token')
    }
    
  if (!token&&whiteList.indexOf(to.name)===-1) {
    app && app.$message.warning('未授权，请登陆授权后继续');
    NProgress.done()
     return next({name: 'login'})
  }else{ 
    return next()
  }
})

router.afterEach(transition => {
  setTimeout(() => {
    NProgress.done()
  })
})

window.APP_INFO = process.env.APP_INFO

//status < 500 不会抛错误
Axios.defaults.validateStatus = status => {
  return status < 500
}
// 设置请求token
Axios.interceptors.request.use(config => {
   let oUrl=config.url;
   var inter;
   let token = localStorage.getItem('访问token')||localStorage.getItem('wv_token');
 if(oUrl.match('/api/')){
    inter=sign();
 } else if(oUrl.match('/website/')){
  inter=websitesign()
 } 
 
  config.headers['Authorization'] = 'Bearer ' + token
  config.headers['api-token'] = inter;
  return config
})

//接口错误拦截
Axios.interceptors.response.use(res => {
   
  if (res.status === 401) {
    app && app.$message({
      type: 'warning',
      message: res.data.message
    })
     let url=res.request.responseURL;
     
     if(url.match('website')){
      router.push({name: 'w-login'})
    } else if(url.match('api')){
      router.push({name: 'login'})
    }
    return Promise.reject(new Error('身份过期'))
  } else {

    return res
  }
}, err => {
  app.$notify.error({
    title: '服务错误',
    message: '服务器响应错误 ' + err.message
  })
  return Promise.reject(err)
})


// Vue.prototype.$http = Axios
// Vue.http = Axios


Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

window.app = app

