<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增商家申请列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="商家名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.full_name"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="图片验证码"><br>
          <el-input v-model="form.imgCode" placeholder="点击图片更换图片验证码" class='code picture'></el-input>
          <img :src='picturecode' @click='changPicture'>
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input v-model="form.messageCode" class='code'></el-input>
          <m-button type='primary' @click='messagecode'>获取</m-button>
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
      picturecode: '',
      province: [],
      city: [],
      area: [],
      form: {
        title: '',
        full_name: '',
        mobile: '',
        imgCode: '',
        messageCode: '',
        c_province: '',
        c_city: '',
        c_area: ''

      }
    }
  },
  created() {
    this.picture(); //图片验证码
  },
  methods: {
    picture() {
      this.$axios.get(this.http.web + 'picture').then(res => {
        const data = res.data.data;
        this.picturecode = data.img;
      })
    },
    messagecode() {
      const param = {
        mobile: this.form.mobile,
        pictureCode: this.form.imgCode
      }
      this.$axios.post(this.http.web + 'sendCode', param).then(res => {
        const data = res.data;
             if(data.errCode!=0){this.$message.warning(data.message) }
      })
    },
    changPicture() {
      this.picture();
    },
    //区域选择
    selectArea(rank, id, site) {
      const abbr = `${this.http.url}getArea`;
      const Url = !rank ? abbr : `${abbr}?level=${rank}&&area_code=${id}`;
      this.$axios.get(Url).then(res => { this[site] = res.data.data; })
    },
    Province(id) { this.selectArea(0, 0, 'province'); }, //省份
    City(id) { this.selectArea(1, id, 'city'); }, //市
    Area(id) { this.selectArea(2, id, 'area'); }, //区域

    onSubmit() {
      const [pid, cid, aid] = [this.form.c_province, this.form.c_city, this.form.c_area];
      const params = {
        name: this.form.title,
        full_name: this.form.full_name,
        mobile: this.form.mobile,
        verifyCode: this.form.messageCode,
        area_index: `${pid},${cid},${aid}`
      }
      this.$axios.post(this.http.web + 'application/create', params).then(res => {
        const data = res.data;
        if (data.errCode !== 0) {
          this.$message.warning(data.message);
        } else {
          this.$message.success('添加成功');
          this.$router.push({ name: 'w-list' })
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
form {
  overflow: hidden;
}

.el-form-item {
  width: 35%;
  /*float:left;margin-left:2%;*/
}

.area {
  width: 50%;
}

.code {
  width: 83%;
}

</style>
