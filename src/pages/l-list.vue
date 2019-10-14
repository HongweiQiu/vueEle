<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
         <el-breadcrumb-item>人员列表</el-breadcrumb-item>
        <router-link :to="{name:'userCreate'}">
          <m-button type="success" size="mini" class='add'>添加</m-button>
        </router-link>
        <m-button type="success" size="mini" class='search' @click='search'>查询</m-button>
        <m-input placeholder="请输入你要查找的名称" theme="success" v-model="query" @keyup.enter.native="search()" />
      </el-breadcrumb>
    </div>
    <div class="box" > <i ></i>
      <el-table :data="table" max-height="550"  :default-sort = "{prop: 'created_at', order: 'descending'}" 
      v-loading="loading"  element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
        <el-table-column label="#" type="index" ></el-table-column> 
       
        <el-table-column v-for='item in list' :label="item.label" :prop="item.prop" :key='item.label' ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <m-button type="success" size="mini" @click='update(scope.row.id)'>编辑</m-button>
            <m-button type="danger" size="mini" @click='del(scope.row.id)'>删除</m-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="display:flex;padding-top:1%;">
        <el-pagination style="margin:0 auto;" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
        :current-page="currentPage4" :page-sizes="[10,15,20,25]" :page-size="3" :size="20" layout="total, sizes, prev, pager, next, jumper" :total="count" @keyup.left.native="left()">
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
        { label: '角色ID', prop: 'user_id' },
        { label: '操作内容', prop: 'contents' },
        { label: 'ip地址', prop: 'ip' },
        { label: 'ip所属位置', prop: 'ip_city' },
        { label: '更改时间', prop: 'created_at' },
      ],
      loading:true,
      query: '',
      table: [],
      num: '',
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('页数'))
    }
  },

  created() {
    this.sindex()
  },

  methods: {
    left() {
      alert(1)
    },
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
      localStorage.setItem('页数',this.page)
      this.sindex()
    },

    //显示站点列表
    sindex() {
       const _this=this;
      const pages = localStorage.getItem('页数') == '' ? 1 :localStorage.getItem('页数');
      const nums = this.num == '' ? 10 : this.num;
      const abbrUrl=`${this.http.url}logs/index?`;
      const Url = !this.query ?
       `${abbrUrl}page=${pages}&&num=${nums}` : `${abbrUrl}searchCondition=name:${this.query};`;
      const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } };
      this.http.axios.get(Url, head).then(res => {
        const result = res.data.data;
        const data = result.collection;
        this.count = result.total;
        this.table = []; 
        for (var i of data) {  
          this.table.push(i); }
        setTimeout(function(){_this.loading=false }, 500);
      })
    },

    //修改站点
    update(id) { this.$router.push({ name: 'userUpdate', query: { id} }) },

    //删除站点
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const head = { headers: { "api-token": this.$sign(), "Authorization": this.http.vtoken } };
        this.http.axios.get(`${this.http.url}user/delete?id=${id}`, head).then(res => {
          this.sindex();
          this.$message.success('删除成功')
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
