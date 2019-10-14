<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>站点创建</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
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
          <el-input v-model="form.address" @keyup.enter.native="onSubmit()"></el-input>
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
     province:[],
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

  methods: {
    //区域选择
     selectArea(rank,id,site){
      const head = { headers: {"api-token":this.$sign(), "Authorization": this.http.vtoken}}
      const Url=!rank?`${this.http.url}station/getArea`:`${this.http.url}station/getArea?level=${rank}&&area_code=${id}`;
      this.http.axios.get(Url, head).then(res => {this[site] = res.data.data; }) 
      console.log(this[site])
      },
     Province(id) {this.selectArea(0,0,'province'); }, //省份
     City(id) {this.selectArea(1,id,'city'); }, //市
     Area(id) {this.selectArea(2,id,'area'); }, //区域

    onSubmit() {
         const head = { headers: {"api-token":this.$sign(), "Authorization": this.http.vtoken}}
      const [pid, cid, aid] = [this.form.c_province, this.form.c_city, this.form.c_area];
      const params=  {   
             name: this.form.title, 
        	 full_name: this.form.name, 
        	 mobile: this.form.phone,
        	 password: this.form.pwd, 
        	 rate: this.form.rate, 
        	 max_rate: this.form.maxrate, 
        	 address: this.form.address,
        	 area_index: `${pid},${cid},${aid}` 
        	}
      this.http.axios.post(this.http.url + 'station/create', params,head).then(res => {
        const data=res.data;
        if(data.errCode!==0){
            this.$message.warning(data.message);
        }else{
           this.$message.success('添加成功');
        this.$router.push({ name: 'index' })
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
.el-form{overflow:hidden;}
.area{width:100%!important;}
.el-form-item {float:left;width:35%;margin-bottom:14px;
   }
.el-form>div:nth-child(2n){margin-left:5%;}
.el-form>div:nth-child(n+8){margin-left:0;}
.clear{clear:left;}
</style>
