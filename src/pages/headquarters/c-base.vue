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
    <div class="box"><el-upload
  class="upload-demo"
  drag
  :on-error='error'
  name='logo'
  :headers='head'
  multiple
  action="http://retail.caidj.cn/api/config/base"
   :on-success="handleAvatarSuccess">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，大于0Kb且不超过500kb,不能重复上传同一张</div>

</el-upload><div><img style="width:20%;margin:0.6% 0 0 1%;" v-bind:src="img"></div><div class="clear"></div>
<hr>
      <el-form ref="form" :model="form">
  
        <br>
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
      img:'',
      form: {
        title:'',
        address:'',
        mobile:'',
        notice:'',
      }
    }
  },
computed:{
  head() {
      return {
        'api-token': this.$sign(),
        'Authorization':'Bearer '+localStorage.getItem('访问token')
      }
    }
},
  created(){
    this.allConfig();
  },
  methods: {
    handleAvatarSuccess(){  
     this.$message.success('上传成功')
     this.allConfig()
   },

     error(err, file, fileList){
     
    this.$message.warning('上传条件不符合格式')
     },
     allConfig(){
      this.http.axios.get(this.http.url + 'config/all').then(res => {
        const data = res.data.data;
        this.img='http://retail.caidj.cn'+data.logo;
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
    
      const params = {
        title: this.form.title,
        send_address: this.form.address,
        tel: this.form.mobile,
        public_msg: this.form.notice
    
      }
      this.http.axios.post(this.http.url + 'config/base', params).then(res => {
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

</script scoped>
<style>
.el-form {
  overflow: hidden;
}

.area {
  width: 100% !important;
}

.el-form-item {

  
}

.el-form>div:nth-child(2n) {
 /* margin-left: 5%;*/
}

.el-form>div:nth-child(n+8) {
  margin-left: 0;
}
.el-input {width:30%;}
.clear {
  clear: left;
}
.upload-demo{float:left;}
hr{border: 0.1px solid #eee;}

.el-textarea__inner{width:40%; min-height: 170px!important;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)}
</style>
