<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'b-home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色更新</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
        <div class='clear'></div>
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
      form: { name: '', note: '' }
    }
  },
  created() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      this.$axios.get('http://retail.caidj.cn/business/role/index').then(res => {
        const data = res.data.data.collection;
        for(var i of data){
           if(i.id==this.$route.query.id){
            this.form.name = i.name;
            this.form.note = i.remark;
        }
        }
      })
    },

    onSubmit() {
      const params = {
        id: this.$route.query.id,
        name: this.form.name,
        remark: this.form.note
      }
      const url='business/role/update'
      this.$api.update(url,params,'b-rolelist','修改成功');
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

.el-form>div:last-child {
  margin-left: 0;
}

.clear {
  clear: left;
}

</style>
