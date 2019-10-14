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
    <div class="box">
      <el-form ref="form" :model="form">
  
        <el-form-item label="短信账号">
          <el-input v-model="form.mCount"></el-input>
        </el-form-item>
          <el-form-item label="短信密码">
          <el-input v-model="form.mPassword"></el-input>
        </el-form-item>
        <el-form-item label="短信模板">
          <el-input v-model="form.mTemplate"></el-input>
        </el-form-item>
        <el-form-item label="公众号AppId">
          <el-input v-model="form.publicId"></el-input>
        </el-form-item>
        <el-form-item label="公众号AppSecret">
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

    const head = { headers: { "api-token": this.$sign(), "Authorization":this.http.vtoken } }
      this.http.axios.get(this.http.url + 'config/all', head).then(res => {
        const data = res.data.data;
            this.form.title=data.title;
            this.form.address=data.send_address;
            this.form.mobile=data.tel;
            this.form.notice=data.public_msg;
            this.form.wCount=data.mchid;
            this.form.wPassword=data.appkey;
             
             this.form.mCount=data.dx_user;
             this.form.mPassword=data.dx_pwd;
             this.form.mTemplate=data.register_tem;
             this.form.publicId=data.appid;
             this.form.appSecret=data.appsecret;
      })

     },

    onSubmit() {
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } }
      const params = {
       dx_user: this.form. mCount,
        dx_pwd: this.form.mPassword,
        register_tem: this.form.mTemplate,
        appid: this.form.publicId,
        appsecret:this.form.appSecret
      }
      this.http.axios.post(this.http.url + 'config/project', params, head).then(res => {
        const data = res.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        } else {
          this.$message.success('提交成功');
        this.allconfig()
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
