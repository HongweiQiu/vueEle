
const menus = [
  {id: '0', label: '控制面板', path: '/', icon: 'fa fa-dashboard'},


  {
    id: 'pages',
    icon: 'fa fa-circle-o',
    label: 'Pages 页面',
    submenu: [
      {id: 'p-data-table', name: 'p-data-table', label: 'Table 表格数据'},
      {id: 'cnode', name: 'cnode', label: 'Cnode社区'},

        {id: 'f0',label: '123', name: 'index'},
      {id: 'p1', name: 'login', label: 'Login 登录'},
      {id: 'p2', name: 'p-login', label: 'Login 登录2'},
      {id: 'p3', name: 'p-register', label: 'Register 注册'},
      {id: '400', path: '/api/station/index', label: '404'},
      {id: '500', path: '/500', label: '500'}
    ]
  },
 
]
export default menus
