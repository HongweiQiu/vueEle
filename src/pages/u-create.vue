<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
  
        <el-form-item label="角色">
    <el-select v-model="form.id" placeholder="请选择角色" style="width:100%;">
     <el-option v-for="item in role" :label="item.name" :value="item.id" :key='index'></el-option>
    </el-select>
  </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.full_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="格式为字母数字，大于6位小于20位"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email"></el-input>
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
      role:[],
      form: {
        id: '',
        full_name:'',
        name:'',
        mobile:'',
        email:'',
        password:'',
      }
    }
  },
   created(){
    this.roleSelect();
   },
  methods: {
 roleSelect(){
     const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } }
      this.http.axios.get(this.http.url + 'role/lists',head).then(res => {

        const data = res.data;
        this.role=data.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        } 
      })
 },

    onSubmit() {
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } }

      const params = {
        role_id: Number(this.form.id),
        full_name: this.form.full_name,
        name: this.form.name,
        mobile: this.form.mobile,
        email: this.form.email,
        password: this.form.password,

      }
      this.http.axios.post(this.http.url + 'user/create', params, head).then(res => {
        const data = res.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        } else {
          this.$message.success('添加成功');
          this.$router.push({ name: 'userIndex' })
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
.el-form {
  overflow: hidden;
}

.area {
  width: 100% !important;
}

.el-form-item {
  float: left;
  width: 35%;
  margin-bottom: 14px;
}

.el-form>div:nth-child(2n) {
  margin-left: 5%;
}

.el-form>div:nth-child(n+8) {
  margin-left: 0;
}

.clear {
  clear: left;
}

</style>
