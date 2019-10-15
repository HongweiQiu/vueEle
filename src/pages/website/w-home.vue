<template>
   <div>
     <button @click='exit'>退出</button>
  </div>
</template>

<script>
export default{
	data(){
	  return {}
	},

    created(){},

	methods:{
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