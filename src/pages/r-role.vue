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
   <!--   <el-menu
   
      class="el-menu-vertical-demo">
      <el-submenu index="1" v-for='(item,index) in checkboxs' :key="index">
        <template slot="title">
       
          <span>  <m-checkbox v-model="item.isSelect" :checked="item.isSelect" :val='item.id'></m-checkbox>{{item.name}}</span>
        </template>
        </el-menu-item-group>
        <el-submenu index="2-1" v-for='second in item.selfNext'  :key="second.name">
          <template slot="title"> 
           <m-checkbox   :checked="second.isSelect" :val='second.id'></m-checkbox>{{second.name}}</template>
          <el-menu-item index="3-1"  v-for='third in second.sonList'  :key="third.name">  
            <m-checkbox  :checked="third.isSelect" :val='third.id'></m-checkbox>{{third.name}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu> -->
     <!--  <el-table :data="tableData" style="margin-bottom: 20px;" row-key="id" width="100%" 
       @selection-change="handleSelectionChange"
        ref="multipleTable"
      v-loading="loading" element-loading-text="拼命加载中" :tree-props="{children: 'selfNext', hasChildren: 'hasChildren'}">
        <el-table-column type="selection" width="55" > </el-table-column>
      
        <el-table-column prop="name" label="角色菜单"> </el-table-column>
      </el-table> -->
   <el-tree
  :data="tableData"
  show-checkbox
   node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

      <m-button type="success" @click="submit">提交</m-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkArr:[],
      checkboxs:[],
      loading: true,
      tableData: [],
       defaultProps: {
          children: 'selfNext',
          label: 'name'
        },
      id:this.$route.query.id,
      mId: ''
    }
  },

  created() {
    this.sonList();

  },

  methods: {
   test(id){alert(id)},
      submit() {
        console.log(this.$refs.tree.getCheckedNodes());
        const mid=this.$refs.tree.getCheckedKeys();
        this.mId=mid.join(',');
       console.log(this.mId)
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } }
      const params = {id:this.id, menuId:this.mId } 
      this.http.axios.post(`${this.http.url}role/authorize`,params, head).then(res => {
        if (res.data.errCode == 0) {
          this.$message.success("授权成功");
          this.sonList();
        } else {
          this.$message.warning("授权失败")
        }
      }).catch(err => {})

      },
    
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
    sonList() {
    
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } };
      this.http.axios.get(`${this.http.url}role/getMenu?id=${this.id}`, head).then(res => {
        this.tableData = [];
        const data = res.data.data;
      this.checkboxs=data;
        const _this = this;
        for (var i of data) {
          const json = JSON.parse(JSON.stringify(i).replace(/sonList/g, "selfNext"));
          this.tableData.push(json);
              

        }
            this.$refs.tree.setCheckedKeys([3,4]);
        setTimeout(function() { _this.loading = false }, 500);
      // 
      })
    }

  }
}

</script>
<style scoped>
</style>
