<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>人员列表</el-breadcrumb-item>
        <router-link :to="{name:'userCreate'}">
          <m-button type="success" size="mini" class='add'>添加</m-button>
        </router-link>
        <m-button type="success" size="mini" class='search' @click='search'>查询</m-button>
        <m-input placeholder="请输入你要查找的名称" theme="success" v-model="query" @keyup.enter.native="search()" />
      </el-breadcrumb>
    </div>
    <div class="box"> <i></i>
      <el-table :data="table" max-height="550" :default-sort="{prop: 'created_at', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column v-for='item in list' :label="item.label" :prop="item.prop" :key='item.label'></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch  style="display: block" v-model="!!scope.row.status" 
            active-text="正常"
            inactive-text="冻结"
            active-color="#13ce66" inactive-color="#ff4949" disabled>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <m-button type="success" size="mini" @click='update(scope.row.id)'>编辑</m-button>
            <m-button type="danger" size="mini" @click='del(scope.row.id)'>删除</m-button>
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
       value:'',
      list: [
        { label: '名称', prop: 'name' },
        { label: '姓名', prop: 'full_name' },
        { label: '手机', prop: 'mobile' },
        { label: '电子邮箱', prop: 'email' },
        { label: '角色', prop: 'role.name' },
      ],
      loading: true,
      query: '',
      table: [],
      arrPage: this.$store.state.showNum,
      num: '',
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('people'))
    }
  },

  created() {
    this.sindex()
  },

  methods: {
    //查询信息
    search() {
      this.sindex()
    },
    //每页显示的条数
    handleSizeChange(val) {
      this.num = val;
      this.sindex()
    },

    //跳转页面
    handleCurrentChange(val) {
      this.page = val;
      localStorage.setItem('people', this.page)
      this.sindex()
    },

    //显示站点列表
    sindex() {

      const _this = this;
      let _query = this.query;
      const pages = localStorage.getItem('people') == null ? 1 : localStorage.getItem('people页数');
      const nums = this.num == '' ? this.arrPage[0] : this.num;
      const abbrUrl = `${this.http.url}user/index?page=${pages}&&num=${nums}`;
      const Url = !_query ?
        `${abbrUrl}` : `${abbrUrl}&&search=name:${_query}`;

      this.$axios.get(Url).then(res => {
        const result = res.data.data;
        const data = result.collection;
        this.count = result.total;

        this.table = [];
        for (var i of data) {
          this.table.push(i);
        }
        setTimeout(function() { _this.loading = false }, 500);
      })
    },

    //修改站点
    update(id) { this.$router.push({ name: 'userUpdate', query: { id } }) },

    //删除站点
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get(`${this.http.url}user/delete?id=${id}`).then(res => {
          const data = res.data;
          if (data.errCode != 0) {
            this.$message.warning(data.message);
          } else {
            this.$message.success('删除成功')
          }
          this.sindex();

        })
      }).catch(() => { this.$message.warning('已取消删除') });
    }
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
