<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增商家</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="商家名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="利率">
          <el-input v-model="form.rate"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" palceholer="格式为字母数字,大于6位小于20位"></el-input>
        </el-form-item>
       
         
        <div class='clear'></div>
        <el-form-item>
          <el-button type="success" @click="onSubmit">立即创建</el-button>
          <el-button @click="reset" type='primary'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        rate: '',
        phone: '',
       password: '',
     
      }
    }
  },

  methods: {

    onSubmit() {
      const head = { headers: { "api-token": this.$websitesign(), "Authorization": this.http.wv_token } };
      const params=  {   
          name: this.form.name, 
           mobile: this.form.phone,
           password: this.form.password, 
           rate: this.form.rate, 
          }
      this.$axios.post(this.http.web + 'business/create', params,head).then(res => {
        const data=res.data;
        if(data.errCode!==0){
            this.$message.warning(data.message);
        }else{
           this.$message.success('添加成功');
        this.$router.push({ name: 'w-list' })
        }
       
      }).catch(err => {
        const errtip = err.response.data;
        this.$message.info(errtip.message)
      })
    },
    reset() {
      for (var i in this.form) {
        this.form[i] = ''
      }
    }
  }

}

</script>
<style scoped>
.el-form{overflow:hidden;}

.el-form-item {width:35%;
   }


.clear{clear:left;}
</style>
