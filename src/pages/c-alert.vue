<template>
  <div><button @click='goBack'>测试</button></div>
</template>
<script type="text/javascript">
  export default{
    methods:{
   goBack() {

      const axios = require('axios');
      // const requestConfig = {
      //   headers: {
      //     "api-auth": localStorage.getItem('签名token'),
      //     "Authorization": localStorage.getItem('访问token')
      //   },
      // };
      axios.post('http://retail.caidj.cn/api/refresh').then(res => {
               console.log('suceess')
      }).catch(err => {
        console.log(err);
        //   const refresh_token=localStorage.getItem('刷新token')
        //     console.log(refresh_token)  
      })
    },
  }
  }

</script>