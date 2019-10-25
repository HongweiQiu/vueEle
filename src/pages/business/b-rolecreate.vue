<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'b-home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="form" :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="form.note"></el-input>
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
        note: '',
        name: '',
      }
    }
  },

  methods: {
    onSubmit() {
      const params=  {name: this.form.name, remark: this.form.note } 
      this.$api.update('business/role/create',params,'b-rolelist','添加成功')       
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
