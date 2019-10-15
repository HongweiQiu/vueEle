import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name =>()=> import('@/pages/' + name)
const website =name=>()=>import('@/pages/website/'+name)
export default new Router({

   // mode: 'history',
  routes: [
    { 
         //总部端页面
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
       
         //站点管理页面
        {path: '/api/station/index', name: 'index', component: page('s-list')},
        {path: '/api/station/create', name: 'create', component: page('s-create')},
        {path: '/api/station/update', name: 'update', component: page('s-update')}, 
         //修改密码
        {path: '/modify', name: 'modify', component: page('modify')},
        //角色列表
        {path: '/api/role/index', name: 'roleIndex', component: page('r-list')},
        {path: '/api/role/create', name: 'roleCreate', component: page('r-create')},
        {path: '/api/role/update', name: 'roleUpdate', component: page('r-update')}, 
        {path: '/api/role/role', name: 'roleOrder', component: page('r-role')},
        //人员列表
        {path: '/api/user/index', name: 'userIndex', component: page('u-list')},
        {path: '/api/user/create', name: 'userCreate', component: page('u-create')},
        {path: '/api/user/update', name: 'userUpdate', component: page('u-update')}, 
  
         //日志列表
        {path: '/api/logs/index', name: 'logIndex', component: page('l-list')},
        //配置管理
        {path: '/api/config/base', name: 'configBase', component: page('c-base')},
        {path: '/api/config/project', name: 'configProject', component: page('c-project')},
        {path: '/api/config/pay', name: 'configPay', component: page('c-pay')},

        {path: '/button', name: 'c-button', component: page('c-button')},
        {path: '/switch', name: 'c-switch', component: page('c-switch')},
        {path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox')},
        {path: '/alert', name: 'c-alert', component: page('c-alert')},
        {path: '/input', name: 'c-input', component: page('c-input')},
        {path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard')},
        {path: '/loading', name: 'c-loading', component: page('c-loading')},
        // {path: '/data-table', name: 'p-data-table', component: page('table')},
        {path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown')},
        {path: '/navbar', name: 'c-navbar', component: page('c-navbar')},
        {path: '/container', name: 'c-container', component: page('c-container')},
        {path: '/demo', name: 'demo', component: page('demo')},
        {path: '/404', name: '404', component: page('404')},
        {path: '/500', name: '500', component: page('500')}
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages
    {path: '/home-login', name: 'p-login', component: page('home-login')},
    {path: '/register', name: 'p-register', component: page('register')},
    {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
    //站点端页面
     {path: '/website/login', name: 'w-login', component: website('w-login')},
     {path: '/website/home', name: 'w-home', component: website('w-home')},
    {path: '*', redirect: {name: '404'}},

  ]

})



