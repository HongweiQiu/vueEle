<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box c-project">
      <el-form ref="form" :model="form">
  
        <el-form-item label="短　信 　账　 号"><br>
          <el-input v-model="form.mCount"></el-input>
        </el-form-item>
          <el-form-item label="短　信 　密　 码"><br>
          <el-input v-model="form.mPassword"></el-input>
        </el-form-item>
        <el-form-item label="短　信　 模　 板"><br>
          <el-input v-model="form.mTemplate"></el-input>
        </el-form-item>
        <el-form-item label="公　众　号AppId"><br>
          <el-input v-model="form.publicId"></el-input>
        </el-form-item>
        <el-form-item label="公众号AppSecret"><br>
          <el-input v-model="form.appSecret"></el-input>
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
        mCount:'',
        mPassword:'',
        mTemplate:'',
        publicId:'',
        appSecret:''
      }
    }
  },
  created(){
    this.allConfig();
  },
  methods: {
allConfig(){
      this.$axios.get('http://retail.caidj.cn/api/config/all').then(res => {
        const data = res.data.data;
             this.form.mCount=data.dx_user;
             this.form.mPassword=data.dx_pwd;
             this.form.mTemplate=data.register_tem;
             this.form.publicId=data.appid;
             this.form.appSecret=data.appsecret;
      })

     },

    onSubmit() {
      const params = {
       dx_user: this.form. mCount,
        dx_pwd: this.form.mPassword,
        register_tem: this.form.mTemplate,
        appid: this.form.publicId,
        appsecret:this.form.appSecret
      }
      const url='api/config/project';
      this.$api.update(url,params,'','提交成功');
    },
    reset() {
      for (var i in this.form) {
        this.form[i] = ''
      }
    }
  }

}

</script>
<style >
.el-form {
  overflow: hidden;
}

.c-project .el-input{width:30%;}

.el-form>div:nth-child(n+8) {
  margin-left: 0;
}

.clear {
  clear: left;
}

</style>
