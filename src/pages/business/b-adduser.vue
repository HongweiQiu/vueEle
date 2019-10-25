<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'b-home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="商家名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="格式为字母数字，大于6位小于20位"></el-input>
        </el-form-item>
       
        <el-form-item label="利率">
          <el-input v-model="form.rate"></el-input>
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
        name:'',
        mobile:'',
        rate:'',
        password:'',
      }
    }
  },
 
  methods: {

    onSubmit() {
      const params = {
 
        name: this.form.name,
        mobile: this.form.mobile,
        rate: this.form.rate,
        password: this.form.password,

      }
      const url='business/user/create';
    this.$api.update(url,params,'b-userlist','添加成功')
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
.el-form {
  overflow: hidden;
}



.el-form-item {
 
  width: 35%;
  margin-bottom: 14px;
}


.el-form>div:nth-child(n+8) {
  margin-left: 0;
}

.clear {
  clear: left;
}

</style>
