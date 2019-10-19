<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        <router-link :to="{name:'roleCreate'}">
          <m-button type="success" size="mini" class='add'>添加角色</m-button>
        </router-link>
        <!--  <m-button type="success" size="mini" class='search' @click='search'>查询</m-button>
        <m-input placeholder="请输入你要查找的名称" theme="success" v-model="query" @keyup.enter.native="search()" /> -->
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-table :data="table" max-height="550" :default-sort="{prop: 'created_at', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column v-for='item in list' :label="item.label" :prop="item.prop" :key='item.label'></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <m-button type="success" size="mini" @click='update(scope.row.id)' :disabled="scope.row.name == '超级管理员'">编辑</m-button>
            <m-button type="danger" size="mini" @click='del(scope.row.id)' :disabled="scope.row.name == '超级管理员'">删除</m-button>
            <m-button type="primary" size="mini" @click='authorize(scope.row.id)' :disabled="scope.row.name == '超级管理员'">授权</m-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="display:flex;padding-top:1%;">
        <el-pagination style="margin:0 auto;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="arrPage" :page-size="3" :size="20" layout="total, sizes, prev, pager, next, jumper" :total="count" @keyup.left.native="left()">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      loading: true,
      list: [
        { label: '角色', prop: 'name' },
        { label: '备注', prop: 'remark' },
      ],
      query: '',
      table: [],
      num: '',
       arrPage: this.$store.state.showNum,
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('角色'))
    }
  },

  created() {
    this.sindex()
  },

  methods: {
    //每页显示的条数
    handleSizeChange(val) {
      this.num = val;
      this.sindex()
    },

    //跳转页面
    handleCurrentChange(val) {
      this.page = val;
      localStorage.setItem('角色', this.page)
      this.sindex()
    },

    //显示角色列表
    sindex() {
      const pages = localStorage.getItem('角色') == null ? 1 : localStorage.getItem('角色');
      const nums = this.num == '' ? this.arrPage[0] : this.num;
      const abbr = `${this.http.url}role/index?page=${pages}&&num=${nums}`;
      const Url = !this.query ?
        abbr : `${abbr}&&search=name:${this.query}`;
       this.$axios.get(Url).then(res => {
        const result = res.data.data;
        const data = result.collection;
        this.count = result.total;
        this.table = [];
        const _this = this;
        for (var i of data) {
          this.table.push(i);
          setTimeout(function() { _this.loading = false }, 500);
        }
      })
    },

    //修改角色
    update(id, res) { this.$router.push({ name: 'roleUpdate', query: { id } }) },

    //删除角色
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`${this.http.url}role/delete?id=${id}`).then(res=> {
          const data =res.data;
          if(data.errCode=!0){
            this.$message.warning(data.message);
          }else{ this.sindex();
          this.$message.success('删除成功')}
         
        })
      }).catch(() => { this.$message.warning('已取消删除') });
    },

    authorize(id) { this.$router.push({ name: 'roleOrder', query: { id } }) }
  }
}

</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.box-body {
  width: 100%;
  overflow: auto;
}

.add,
.search,
.m-input-wrapper {
  float: right;

}

.search,
.m-input-wrapper {
  margin-right: 10px;
}

.el-breadcrumb__item {
  heigth: 27px;
  line-height: 27px;
}

@media(max-width:1368px&&max-height:800px) {
  .el-table {
    max-height: 200px;
  }
}

@media(max-width:1368px&&max-height:600px) {
  .el-table {
    max-height: 100px;
  }
}

</style>
