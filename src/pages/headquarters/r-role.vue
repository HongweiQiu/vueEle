<template>
  <div class="page-body">
    <div class="page-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>授权</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-tree :data="tableData" show-checkbox node-key="id"  ref="tree" 
      highlight-current :props="defaultProps">
      </el-tree>
      <m-button type="success" @click="submit" :disabled='select'>提交</m-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
     select:false,
      tableData: [],
      defaultProps: {
        children: 'selfNext',
        label: 'name'
      },
      id: this.$route.query.id,
      mId: ''
    }
  },

  created() {
    this.sonList();

  },

  methods: {
    submit() {
     const mid = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.mId = mid.join(',');
      const params = { id: this.id, menuId: this.mId }
      if(this.mId){
       this.$axios.post(`${this.http.url}role/authorize`, params).then(res => {
        if (res.data.errCode == 0) {
          this.$message.success("授权成功");
          this.sonList();
        } else {
          this.$message.warning("授权失败")
        }
      })
      } else{
       this.$message.warning('请勾选权限,不允许为空')
      }
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    
    sonList() {
      this.$axios.get(`${this.http.url}role/getMenu?id=${this.id}`).then(res => {
        this.tableData = [];
        const data = res.data.data;
        const _this = this;
        for (var i of data) {
          const json = JSON.parse(JSON.stringify(i).replace(/sonList/g, "selfNext"));
          this.tableData.push(json);
        }
        const key = [];
        for (var i of this.tableData) {
          // debugger
          if (i.isSelect && i.selfNext) {
            // debugger
            for (var i of i.selfNext) {
              // debugger
              if (i.isSelect && !i.selfNext) {
                key.push(i.id)
                this.$refs.tree.setCheckedKeys(key);
              } else if (i.isSelect && i.selfNext) {
                for (var i of i.selfNext) {
                  if (i.isSelect) {
                    key.push(i.id)
                    this.$refs.tree.setCheckedKeys(key);
                  }
                }
              }
            }
          }
        }
        setTimeout(function() { _this.loading = false }, 500);
      })
    }

  }
}

</script>
<style >
.el-tree-node__content {
    height: 50px;
    border-bottom: 1px solid #e4e7ed;
}
</style>
