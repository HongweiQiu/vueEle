//列表
export default{
	 list(mid){const _this=this;
      const nums = this.num == '' ? 3 : this.num;
      const abbrUrl=`${this.http.url}${mid}/index?`;
      const Url = !this.query ?
        `${abbrUrl}page=${pages}&&num=${nums}` : `${abbrUrl}psearch=name:${this.query};`;
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } };
      this.http.axios.get(Url, head).then(res => {
        const result = res.data.data;
        const data = result.collection;
        this.count = result.total;
        this.table = []; 
        for (var i of data) {  
          this.table.push(i); }
        setTimeout(function(){_this.loading=false }, 500);
      })
},
login(){

	 this.isLoging = true;
      if (!this.username || !this.password) {

        // return this.$message.warning('用户名和密码不能为空')

      }

     if(this.password.length<6){
       // return this.$message.warning('密码最少为6个字符')
     }
 
     const [axios,params,requestConfig]=[
          require('axios'),
          {'username':this.username, 'password':this.password },
          {headers: {"api-token": this.$sign(), } }
        ]
      
     axios.post('http://retail.caidj.cn/api/login',params,requestConfig).then(res => {
          const result=res.data;
           this.isLoging = true;
          // this.$message.success('登录成功');
         
          localStorage.setItem('刷新token',result.data.refresh_token);
          localStorage.setItem('访问token',result.data.access_token);
          this.$router.push({name: 'home'});
      }).catch(err=>{
          const errCode=err.response.data;
          if(errCode.errCode){ 
          // this.$message.info(errCode.message);
       
      }
      });
       const _this=this;
  setTimeout(function(){ _this.isLoging=false},1500)
   
}
	

}
 