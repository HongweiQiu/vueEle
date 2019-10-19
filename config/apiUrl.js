 // import sign from './../static/js/setting.js'

      const [axios, refresh,url,web,vtoken,wv_token] = [
                                   require('axios'),
                                   { refreshToken: localStorage.getItem('刷新token') },
                                   'http://retail.caidj.cn/api/',
                                   'http://retail.caidj.cn/website/',
                                    'Bearer ' + localStorage.getItem('访问token'),
                                    'Bearer ' + localStorage.getItem('wv_token')
                                    ]

export default {                

 axios,
 refresh,
 vtoken,
 wv_token,
 url,
 web
};
