<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'b-home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>配置管理</el-breadcrumb-item>
        <el-breadcrumb-item>基本配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box b-config">
      <p style="float:left;">实景组图 : </p>
         <el-upload  class="upload-demo" drag :before-upload="beforeUpload" multiple action="#" show-file-list>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      
      </el-upload>
    
  <div class="photos" >
     <el-carousel :interval="4000" type="card" height="180px" >
    <el-carousel-item v-for='(item,index) in test' :key="item">
     <el-image  :src="'http://retail.caidj.cn'+item" :key='index'></el-image>
    </el-carousel-item>
  </el-carousel>
  </div> 
  <el-divider></el-divider>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="商家名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
 <el-form-item label="联系地址">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
 
    <div class="block">
    <span class="demonstration">下单时间</span>
    <el-time-picker
    is-range
   v-model='time'
    value-format="HH:mm:ss"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
  </div><br>
  <el-form-item label="店招">
    <el-input type="textarea" v-model="form.img"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test:[],
         imgs:[],
        time: [new Date(), new Date()],
      form: {
        name:'',
        address:'',
        img:''
      }
    }
  },

  created(){
    this.allConfig();
  },

  methods: {
     beforeUpload(file) {
      var fd = new window.FormData();
      fd.append('photo', file, 'fileName')
      this.$axios.post("http://retail.caidj.cn/business/uploadFile", fd).then(res => {
        if (res.data.errCode != 0) {
          this.$message.warning(res.data.message)
        } else {
          this.$message.success('上传成功');
         this.imgs.push(res.data.data.path);
        }
      });
      return false // 返回false不会自动上传
    },

     allConfig(){
      this.$axios.get('http://retail.caidj.cn/business/config/all').then(res => {
        const data = res.data.data;   
            this.form.name=data.name;
            this.form.address=data.address;
            this.form.img=data.img;
           this.test=data.diagram;
            const stime=data.open_time;
            const sHours=stime.substring(0,2);
            const sMin=stime.substring(3,5);
            const sSecond=stime.substring(6,8);

            const etime=data.end_time;
            const eHours=etime.substring(0,2);
            const eMin=etime.substring(3,5);
            const eSecond=etime.substring(6,8);
           
            const year=new Date().getFullYear();
            const month=new Date().getMonth();
            const day=new Date().getDay();

            this.time=[new Date(year,month,day,sHours,sMin,sSecond), new Date(year,month,day,eHours,eMin,eSecond)];       
      })
     },
    onSubmit() {
      const params = {
       open_time:this.time[0],
       end_time:this.time[1],
       img:this.form.img,
       address:this.form.address,
       name:this.form.name,
       diagram:this.imgs
      }
      const url ='business/config/base'
      this.$api.update(url,params,'b-config',"创建成功")
        this.allConfig();

    },
    reset() {
      for (var i in this.form) {
        this.form[i] = ''
      }
    }
  }

}

</script >
<style>
.b-config .upload-demo{float:left;}
.b-config .el-range-editor.el-input__inner{margin-left:0.5%;}
.b-config .el-input{width:40%;}
.b-config .block{margin-left:1%;}
.el-form-item__content{margin-left:1%!important;}
.b-config .el-textarea{width:40%;}
</style>
