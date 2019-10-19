<template>
   <div>
     <button @click='exit'>退出</button>
       <button @click='add'>自增</button>{{count}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default{
	data(){
	  return {}
	},
     computed:mapState({
     	count:state=>state.winterface.weburl
     }),
    created(){},

	methods:{
		
		add(){
           
		},
		exit(){
			 const head = { headers: {"api-token":this.$websitesign(), "Authorization":  'Bearer ' + localStorage.getItem('wv_token')}}
			 this.http.axios.get('http://retail.caidj.cn/website/logout',head).then(res=>{
			 	const data=res.data.data;
			 	this.$message.success('退出成功')
			 })
		}
	}

}

</script>

<style scoped>

</style>