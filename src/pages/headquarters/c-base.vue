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
    <div class="box config">
      <p>网站logo：</p>
      <el-upload class="upload-demo" drag :before-upload="beforeUpload" multiple action="#" show-file-list>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      
      </el-upload>
      <div><el-image fit="cover" style="width:20%;height:165px;margin:0.6% 0 0 1%;" v-bind:src="img"></el-image></div>
      <div class="clear"></div>
      <el-divider></el-divider>
      </el-upload>
      <el-form ref="form" :model="form">
      
        <el-form-item label="平台名称：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="联系地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="公　　告：">
          <el-input type='textarea' v-model="form.notice"></el-input>
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
export default {
  data() {
    return {

      img: '',
      form: {
        title: '',
        address: '',
        mobile: '',
        notice: '',
      }
    }
  },

  created() {
    this.allConfig();
  },
  methods: {
    beforeUpload(file) {
      var fd = new window.FormData();
      fd.append('logo', file, 'fileName')
      this.$axios.post("http://retail.caidj.cn/api/config/base", fd).then(res => {
        if (res.data.errCode != 0) {
          this.$message.warning(res.data.message)
        } else {
          this.allConfig();
          this.$message.success('上传成功')
        }
      });
      return false // 返回false不会自动上传
    },

    allConfig() {
      this.$axios.get( 'http://retail.caidj.cn/api/config/all').then(res => {
        const data = res.data.data;
        this.img = 'http://retail.caidj.cn' + data.logo;
        this.form.title = data.title;
        this.form.address = data.send_address;
        this.form.mobile = data.tel;
        this.form.notice = data.public_msg;
        this.form.wCount = data.mchid;
        this.form.wPassword = data.appkey;
        this.form.title = data.title;
      })
    },

    onSubmit() {

      const params = {
        title: this.form.title,
        send_address: this.form.address,
        tel: this.form.mobile,
        public_msg: this.form.notice

      }
      const url='api/config/base';
      this.$api.update(url,params,'','提交成功')
    },
    reset() {
      for (var i in this.form) {
        this.form[i] = ''
      }
    }
  }

}

</script>
<style>
.el-form {
  overflow: hidden;
}

.config .el-textarea {
  width: 30%;
}

.el-form>div:nth-child(2n) {
  /* margin-left: 5%;*/
}

.el-form>div:nth-child(n+8) {
  margin-left: 0;
}

.config .el-input {
  width: 30%;
}

.clear {
  clear: left;
}

.config .upload-demo,.config p {
  float: left;
}



.el-textarea .el-textarea__inner {
  height: 150px;
}

</style>
