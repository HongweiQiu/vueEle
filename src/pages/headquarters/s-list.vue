<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
         <el-breadcrumb-item>站点列表</el-breadcrumb-item>
        <router-link :to="{name:'create'}">
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
         <el-table-column label="创建时间"  prop="created_at" sortable></el-table-column>  
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
        :current-page="page" :page-sizes="arrPage" :page-size="3" :size="20" layout="total, sizes, prev, pager, next, jumper" :total="count">
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
      loading:true,
      list: [
       // { label: 'ID', prop: 'id' },
        { label: '用户名', prop: 'name' },
        { label: '姓名', prop: 'full_name' },
        { label: '手机', prop: 'mobile' },
        { label: '区域', prop: 'area_index' },
        { label: '详细地址', prop: 'address' },
       // { label: '创建时间', prop: 'created_at' }
      ],
      query: '',
      table: [],
      arrPage:this.$store.state.showNum,
      num: '',
      count: null,
      page:''
    
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
      localStorage.setItem('站点页',val);
      this.sindex()
    },

    //显示站点列表
    sindex() {
      this.page   = Number(localStorage.getItem('站点页'));
      const query=this.query;
      const pages =  this.page== null ? 1 :this.page;
      const nums  = this.num == '' ? this.arrPage[0] : this.num;
      const abbr  = `api/station/index?page=${pages}&&num=${nums}`;
      const url   = !this.query ?
        `${abbr}` : `${abbr}&&search=name:${query};full_name:${query};address:${query}`;
       this.$api.list(url,this);
    },

    //修改站点
    update(id) { this.$router.push({ name: 'update', query: { id} }) },

    //删除站点
    del(id) {
       const url='api/station/delete';
       this.$api.delete(url,id,this);
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
