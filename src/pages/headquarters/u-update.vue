<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="角色">
          <el-select v-model="form.id" placeholder="请选择角色" style="width:100%;">
            <el-option v-for="(item,index) in role" :label="item.name" :value="item.id" :key='index'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.full_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="格式为字母数字，大于6位小于20位"></el-input>
        </el-form-item>
        <el-form-item >
          <el-switch style="display: block" v-model="value" active-color="#13ce66" inactive-color="#ff4949" 
          active-text="正常" inactive-text="冻结">
          </el-switch>
        </el-form-item>
        <div class='clear'></div>
        <el-form-item>
          <el-button type="success" @click="onSubmit">提交</el-button>
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
      value: '',
      uid: this.$route.query.id,
      role: [],
      form: {
        id: '',
        full_name: '',
        name: '',
        mobile: '',
        email: '',
        password: '',
      }
    }
  },
  created() {
    this.roleSelect();
  },
  methods: {
    roleSelect() {

      this.$axios.get(`${this.http.url}user/index`).then(res => {
        const data = res.data.data.collection;
        for (var i of data) {
          if (i.id == this.uid) {
            this.form.id = i.role_id;
            this.form.full_name = i.full_name;
            this.form.name = i.name;
            this.form.mobile = i.mobile;
            this.form.email = i.email;
            this.value=!!i.status;
          }
        }
      })
      this.$axios.get(this.http.url + 'role/lists').then(res => {
        const data = res.data;
        this.role = data.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        }
      })
    },

    onSubmit() {
      if (!this.form.mobile) { return this.$message.warning('手机号码不能为空'); }
      if (!this.form.email) { return this.$message.warning('电子邮箱不能为空'); }
      const params = {
        id: this.uid,
        role_id: Number(this.form.id),
        full_name: this.form.full_name,
        name: this.form.name,
        mobile: this.form.mobile,
        email: this.form.email,
        password: this.form.password,
        status:Number(this.value)
      }
     
      var newparams = Object.assign({}, params);
      newparams['password'] = this.form.password;
      if (this.form.password) { 
        this.$api.update('api/user/update',newparams,'userIndex','修改成功') }
         else { 
        this.$api.update('api/user/update',params,'userIndex','修改成功') 
         }
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
