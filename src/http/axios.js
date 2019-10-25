import axios from 'axios';
import router from '@/router';
import Vue from 'vue';
let v=new Vue();

const baseUrl='http://retail.caidj.cn/';

export default {
	//登录接口
login(url,params,successPath,that){
    if (!that.username || !that.password) {return that.$message.warning('用户名和密码不能为空') } 
 	if(that.password.length<6){return that.$message.warning('密码最少为6个字符') } 
 		axios.post(baseUrl+url,params).then(res => {
          const result=res.data;
           if(result.errCode!=0){
            v.$message.warning(result.message);
               // router.push({name: 'w-login'});
           }else{  
          v.$message.success("登录成功");
          localStorage.setItem('refresh_token',result.data.refresh_token);
          localStorage.setItem('token',result.data.access_token)
          router.push({name: successPath});
             }   
      }).catch(err=>{
          const errCode=err.response.data;
          if(errCode.errCode){v.$message.info(errCode.message); } 
      });
},
//刷新token

refresh(url,params){
	axios.post(baseUrl+url,params)
},
//退出接口
exit(url,successPath){
      axios.get(baseUrl+url).then(res => {
        router.push({ name: successPath });
        v.$message.success('退出成功');
        localStorage.removeItem('token')
      }).catch(err => {
        v.$message.warning('退出失败');
      })
},

//修改 新增
update(url,params,successPath,remind){
 	   axios.post(baseUrl+url,params).then(res => {
 	   	const data=res.data;
 	   	if(data.errCode!=0){
 	   		  v.$message.warning(data.message); 	   		
 	   	}else{
 	   		  v.$message.success(remind);
         router.push({ name: successPath })
 	   	}
      }).catch(err => {
        const errtip = err.response.data;
        v.$message.info(errtip.message)
      })
 },

//列表接口
 list(url,that){
 	  axios.get(baseUrl+url).then(res => {
        const result = res.data.data;
        const data = result.collection;
       that.count = result.total;
        that.table = [];
        const _this = that;
        for (var i of data) {
          that.table.push(i);
          setTimeout(function() { _this.loading = false }, 500);
        }
      })
 },

 //删除接口
 delete(url,params,that){
      that.$confirm('此操作将永久删除该信息, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       axios.get(baseUrl+url+'?id='+params).then(res => {
       	const data=res.data;
       	if(data.errCode!=0){
           that.$message.warning(data.message)
       	}else{
       		 that.$message.success('删除成功')
          that.sindex();
       	}
        })
      }).catch(() => { that.$message.warning('已取消删除') });
 	
 },

//状态冻结 
nozzle(url,params,that){
  axios.post(baseUrl+url, params).then(res => {
        if(res.data.errCode!=0){
          v.$message.warning(res.data.message)
        }else{
          v.$message.success('更改成功')
        }
         that.sindex()
      })
}
}