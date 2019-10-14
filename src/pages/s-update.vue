<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>站点修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
     
      <el-form ref="form" :model="form">
        <el-form-item :label="item.label" v-for="(item,index) in states" :key="index">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd" placeholder="格式为字母数字，大于6位小于20位"></el-input>
        </el-form-item>
       
        <el-form-item label="利率">
          <el-input v-model="form.rate"></el-input>
        </el-form-item>
        <el-form-item label="商家最大利率">
          <el-input v-model="form.maxrate"></el-input>
        </el-form-item>
     
         <el-form-item label="区域" class='area'><br>
          <el-select v-model="form.c_province" placeholder="请选择省" @click.native='Province(form.c_province)'>
            <el-option :label="item.area_name" :value="item.area_code" v-for='(item,index) in province' :key="index"></el-option>
          </el-select>
          <el-select v-model="form.c_city" placeholder="请选择市" @click.native='City(form.c_province)'>
            <el-option v-for='item in city' :label="item.area_name" :value="item.area_code" :key="item.area_code"></el-option>
          </el-select>
          <el-select v-model="form.c_area" placeholder="请选择区域" @click.native='Area(form.c_city)'>
            <el-option v-for='item in area' :label="item.area_name" :value="item.area_code" :key="item.area_name"></el-option>
          </el-select>
        </el-form-item>
           <el-form-item label="联系地址">
          <el-input v-model="form.address"></el-input>
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
      states:[
         {label:'名称'}
      ],
      show:true,
      province: [],
      city: [],
      area: [],
      form: {
        title: '',
        name: '',
        phone: '',
        pwd: '',
        c_province: '',
        c_city: '',
        c_area: '',
        rate: '',
        maxrate: '',
        address: ''
      }
    }
  },
  created() {
    this.Province();
    this.getInfo();

  },

  methods: {
    isshow(){this.show=false;},
    getInfo(){
     
     const head = { headers: {"api-token":this.$sign(), "Authorization": this.http.vtoken}}

       this.http.axios.get(this.http.url + 'station/info?id='+this.$route.query.id, head).then(res=>{

        const data=res.data.data;
         //console.log(data);
          const address=data.area_index.split(',');
          this.form.c_province=address[0];
          this.form.c_city=address[1];
          this.form.c_area=address[2];
        // const address=data.area_index.split(',');
        //  this.http.axios.get(`${this.http.url}getArea`, head).then(res=>{
        //          const data=res.data.data;
        //          for(var i of data){if(i.area_code==address[0]){this.form.c_province=i.area_name } } })
        //  this.http.axios.get(`${this.http.url}getArea?level=1&&area_code=${address[0]}`, head).then(res=>{
        //             const data=res.data.data;
        //          for(var i of data){if(i.area_code==address[1]){this.form.c_city=i.area_name } } })
        //   this.http.axios.get(`${this.http.url}getArea?level=2&&area_code=${address[1]}`, head).then(res=>{
        //             const data=res.data.data;
        //          for(var i of data){if(i.area_code==address[2]){this.form.c_area=i.area_name } } 

        //  })
        this.form.title=data.name
        this.form.name=data.full_name
        this.form.pwd=''
        this.form.phone=data.mobile
        
        this.form.rate=data.rate
        this.form.maxrate=data.max_rate
        this.form.address=data.address
       })
      
    },
     //区域选择
     selectArea(rank,id,site){
      const head = { headers: {"api-token":this.$sign(), "Authorization": this.http.vtoken}}
      const Url=!rank?`${this.http.url}station/getArea`:`${this.http.url}station/getArea?level=${rank}&&area_code=${id}`;
      this.http.axios.get(Url, head).then(res => {this[site] = res.data.data; }) 
      },
     Province() {this.selectArea(0,0,'province'); }, //省份
     City(id) {this.selectArea(1,id,'city'); }, //市
     Area(id) {this.selectArea(2,id,'area'); }, //区域

    upSubmit(param){
       const head = { headers: {"api-token":this.$sign(), "Authorization": this.http.vtoken}}
       this.http.axios.post(this.http.url + 'station/update', param, head).then(res => {
        this.$message.success('修改成功');
        this.$router.push({ name: 'index'})
      }).catch(err => {
        const errtip = err.response.data;
        this.$message.info(errtip.message)
      })
    },
    onSubmit() {
      const [pid, cid, aid] = [this.form.c_province, this.form.c_city, this.form.c_area];
      const [params] = [
        { id:this.$route.query.id,
          name: this.form.title,
          full_name: this.form.name,
          mobile: this.form.phone,
          //password: this.form.pwd,
          area_index: `${pid},${cid},${aid}`,
          rate: this.form.rate,
          max_rate: this.form.maxrate,
          address: this.form.address
               },
      ]
     var newparams = Object.assign({}, params);;
      newparams['password']=this.form.pwd;
     if(this.form.pwd==''){
      this.upSubmit(params);
     }else{
          this.upSubmit(newparams);
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
.el-form{overflow:hidden;}
.area{width:100%!important;}
.el-form-item {float:left;width:35%;margin-bottom:14px;
   }
.el-form>div:nth-child(2n){margin-left:5%;}
.el-form>div:nth-child(n+8){margin-left:0;}
.clear{clear:left;}

</style>
