<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'b-home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家修改</el-breadcrumb-item>
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
     
        <el-form-item label='是否冻结'>
           <el-switch  @change="change" v-model="value" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
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
      form: {
        id: '',
        name: '',
        mobile: '',
        rate: '',
        password: '',
      }
    }
  },

  created() {
    this.roleSelect();
  },

  methods: {
    roleSelect() {
      const url=`http://retail.caidj.cn/business/`;
      this.$axios.get(url+'user/index').then(res => {
        const data = res.data.data.collection;
        for (var i of data) {
          if (i.id == this.uid) {
            this.form.name = i.name;
            this.form.mobile = i.mobile;
            this.form.rate = i.rate;
            this.value=i.status;
            console.log(this.value)
          }
        }
      })
    },

   change(){
    const params={id:this.uid, status:this.value } 
    this.$api.nozzle('business/user/freeze',params,this)
   },

    onSubmit() {
      const params = {
        id: this.uid,
        name: this.form.name,
        mobile: this.form.mobile,
        rate: this.form.rate,
        password: this.form.password,
      }
      var newparams = Object.assign({}, params);
      newparams['password'] = this.form.password;
      const url ='business/user/update';
      if (this.form.password) { 
        this.$api.update(url,newparams,'b-userlist','修改成功'); 
      } else { 
        this.$api.update(url,params,'b-userlist','修改成功');
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
