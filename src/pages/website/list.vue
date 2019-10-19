<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        <router-link :to="{name:'w-newbusiness'}">
          <m-button type="success" size="mini" class='add'>添加</m-button>
        </router-link>
        <m-button type="success" size="mini" class='search' @click='search'>查询</m-button>
        <m-input placeholder="请输入你要查找的名称" theme="success" v-model="query" @keyup.enter.native="search()" />
      </el-breadcrumb>
    </div>
    <div class="box"> 
      <el-table :data="table" max-height="550" :default-sort="{prop: 'created_at', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column v-for='item in list' :label="item.label" :prop="item.prop" :key='item.label'></el-table-column>
        <el-table-column label="是否加入黑名单">
          <template slot-scope="scope">
            <m-button type="info" size="mini" @click='resume(scope.row.id,scope.row.status)' :disabled='scope.row.status==1'>恢复</m-button>
            <m-button type="warning" size="mini" @click='block(scope.row.id,scope.row.status)' :disabled='scope.row.status==0'>拉黑</m-button>
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
      list: [
        { label: '创建时间', prop: 'created_at' },
        { label: '商家名称', prop: 'name' },
        { label: '手机', prop: 'mobile' },
        { label: '利率', prop: 'rate' },
      ],
      loading: true,
      query: '',
      table: [],
      arrPage: this.$store.state.showNum,
      num: '',
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('list'))
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
      localStorage.setItem('list', this.page)
      this.sindex()
    },

    //显示站点列表
    sindex() {

      const _this = this;
      const query = this.query;
      const pages = localStorage.getItem('list') == null ? 1 : localStorage.getItem('list');
      const nums = this.num == '' ? this.arrPage[0] : this.num;
      const abbrUrl = `${this.http.web}business/list?page=${pages}&&num=${nums}`;
      const Url = !query ?
        `${abbrUrl}` : `${abbrUrl}&&search=mobile:${query};name:${query};created_at:${query}`; //name:test&&searchJoin=and
      this.$axios.get(Url).then(res => {
        const result = res.data.data;
        const data = result.collection;
        this.count = result.total;
        this.table = [];
        for (var i of data) {
          this.table.push(i);
        }
        setTimeout(()=> _this.loading = false , 500);
      })
    },

    //恢复商家
    resume(id, status) {
      var str, status;
      if (status == 1) {
        str = '是否拉入黑名单';
        status = 0;
      } else {
        str = '是否从黑名单移除该商家'
        status = 1;
      }

      this.$confirm(str, '', {
        cancelButtonText: '否',
        confirmButtonText: '是',
        type: 'warning'
      }).then(() => {
        const param = {
          id: id,
          status: status
        }
        this.$axios.post(`${this.http.web}business/addBlackLists`, param).then(() => {
          this.$message.success('成功');
          this.sindex();
        })
      }).catch(() => { this.$message.warning('已取消') });
    },

    //拉黑商家
    block(id, status) {
      this.resume(id, status)
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
