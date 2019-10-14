<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>基本配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
  
     
        <el-form-item label="平台名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
          <el-form-item label="联系电话">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="公告">
          <el-input v-model="form.notice"></el-input>
        </el-form-item>
           <div> {{this.$store.state.newlist}}</div>
     
        <el-form-item>
          <el-button type="success" @click="onSubmit">提交</el-button>
          <el-button @click="reset" type='primary'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {

      form: {
        title:'',
        address:'',
        mobile:'',
        notice:'',
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
            this.form.title=data.title;
      })
     },
    onSubmit() {
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } }
      const params = {
        title: this.form.title,
        send_address: this.form.address,
        tel: this.form.mobile,
        public_msg: this.form.notice
    
      }
      this.http.axios.post(this.http.url + 'config/base', params, head).then(res => {
        const data = res.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        } else {
          this.$message.success('提交成功');
          this.$router.push({ name: 'home' })
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
