<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        <router-link :to="{name:'roleCreate'}">
          <m-button type="success" size="mini" class='add'>添加角色</m-button>
        </router-link>
        <m-button type="success" size="mini" class='search' @click='search'>查询</m-button>
        <m-input placeholder="请输入你要查找的名称" theme="success" v-model="query" @keyup.enter.native="search()" />
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-table :data="table" max-height="550" :default-sort="{prop: 'created_at', order: 'descending'}" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column v-for='item in list' :label="item.label" :prop="item.prop" :key='item.label'></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch @change='change(scope.row.id,scope.row.status)' v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <m-button type="success" size="mini" @click="info(scope.row.id)">详情</m-button>
            <m-button type="info" size="mini" @click='move(scope.row.id,scope.row.company_id)'>转移</m-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Table -->
      <el-dialog title="角色信息" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="name" label="角色"></el-table-column>
          <el-table-column property="remark" label="备注"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch @change='change(scope.row.id,scope.row.status)' v-model="scope.row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog  :visible.sync="show">
        <el-form :model="form">
 
    <el-form-item label="转移至该站点" >
      <el-select v-model="form.site" placeholder="请选择活动区域">
        <el-option v-for="(item,index) in allSite" :label="item.name" :value="item.id" :key="index"></el-option>
      
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="show = false">取 消</el-button>
    <el-button type="primary" @click="movesite">确 定</el-button>
  </div>
      </el-dialog>
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
      dialogTableVisible: false,
      show: false,
      gridData: [],
     form:{
          site:''
     },
     id:'',
      allSite:[],
      loading: true,
      list: [
        { label: '商家', prop: 'name' },
        { label: '电话号码', prop: 'mobile' },
        { label: '创建时间', prop: 'created_at' },
      ],

      query: '',
      table: [],
      num: '',
      arrPage: this.$store.state.showNum,
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('商家'))
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
      localStorage.setItem('商家', this.page)
      this.sindex()
    },

    //显示角色列表
    sindex() {
      const pages = localStorage.getItem('商家') == null ? 1 : localStorage.getItem('商家');
      const nums = this.num == '' ? this.arrPage[0] : this.num;
      const abbr = `${this.http.url}business/index?page=${pages}&&num=${nums}`;
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
    //查找
    search() {
      this.sindex();
    },

  change(id, state) {
      const param = { id: id, status: state }
      this.$axios.post(`${this.http.url}business/freezeAction`, param).then(res => {
        const data = res.data.data

        this.sindex()
      }).catch(() => {

      })
    },

    info(id) {
      this.$axios.get(`${this.http.url}role/info?id=${id}`).then(res => {
        const result = res.data.data;
        const _this = this;
        if (res.data.errCode != 0) {
          this.dialogTableVisible = false;
          this.$message.warning(res.data.message);
        } else {
          this.dialogTableVisible = true;
        }
        this.gridData = [];
        this.gridData.push(result);
        setTimeout(function() { _this.loading = false }, 500);
      })
    },

     move(id) {
       this.id=id
     	this.show=true;
     	 this.$axios.get(`${this.http.url}station/index`).then(res=>{
           const data =res.data.data.collection;
           this.allSite=data;
      
      })
    
    },
    movesite(){  
     	const param={id:this.id, websiteId:this.form.site } 

  this.$axios.post(`${this.http.url}business/divert`,param).then(()=>{
      	this.$message.success('转移成功');
      	this.show=false;
      })

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
