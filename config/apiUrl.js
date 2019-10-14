 // import sign from './../static/js/setting.js'

      const [axios, refresh,url,role,vtoken] = [
                                   require('axios'),
                                   { refreshToken: localStorage.getItem('刷新token') },
                                   'http://retail.caidj.cn/api/',
                                
                                    'Bearer ' + localStorage.getItem('访问token')
                                    ]

export default {                

 axios,
 refresh,
 vtoken,
 url,
};
