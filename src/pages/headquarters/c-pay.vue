<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>支付设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box c-base">
      <el-form ref="form" :model="form">
        <el-form-item label="微 信 商 户 号"><br>
          <el-input v-model="form.wCount"></el-input>
        </el-form-item>
          <el-form-item label="微信商户秘钥"><br>
          <el-input v-model="form.wPassword"></el-input>
        </el-form-item>
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
        wCount:'',
        wPassword:'',
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
            this.form.wCount=data.mchid;
            this.form.wPassword=data.appkey;
           
      })
     },
    onSubmit() {
      const params = {
       mchid: this.form.wCount,
       appkey: this.form.wPassword,
      }
      this.$api.update('api/config/pay',params,'','提交成功')
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
.c-base .el-input{width:30%;}



.el-form>div:nth-child(n+8) {
  margin-left: 0;
}

.clear {
  clear: left;
}

</style>
