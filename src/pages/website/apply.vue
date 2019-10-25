<template>
  <div class="page-body">
    <div class="page-header">
      <!--   <h1 class="page-title">Table表格数据</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家申请列表</el-breadcrumb-item>
        <router-link :to="{name:'w-newapply'}">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <m-button type="success" size="mini" @click='pass(scope.row.id,scope.row.status)' :disabled='scope.row.status==1||scope.row.status==2'>通过</m-button>
            <m-button type="warning" size="mini" @click='reject(scope.row.id,scope.row.status)' :disabled='scope.row.status==1||scope.row.status==0'>驳回</m-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync='seen'>
        <h2 style='text-align:center;'>{{tip}}</h2>
        <el-input v-model="str" autocomplete="off" v-if='strseen'></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="seen = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
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
      list: [
        { label: '名称', prop: 'name' },
        { label: '姓名', prop: 'full_name' },
        { label: '手机', prop: 'mobile' },
        { label: '电子邮箱', prop: 'email' },
        { label: '角色', prop: 'role.name' },
      ],
      loading: true,
      query: '',
      table: [
      ],
      tip: '',
      str: '',
      seen: false,
      strseen: false,
      appid: '',
      appstatus: '',
      arrPage: this.$store.state.showNum,
      num: '',
      page: '1',
      count: null,
      currentPage4: parseInt(localStorage.getItem('apply'))
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
      localStorage.setItem('apply', this.page)
      this.sindex()
    },

    //显示站点列表
    sindex() {
      const _query=this.query;
      const _this = this;
      const pages = localStorage.getItem('apply') == null ? 1 : localStorage.getItem('apply');
      const nums = this.num == '' ? this.arrPage[0] : this.num;
      const abbrUrl = `website/application/list?page=${pages}&&num=${nums}`;
      const url = !_query ?
        `${abbrUrl}` : `${abbrUrl}&&search=status:${_query};name:${_query}`;//&&searchJoin=and
      this.$api.list(url,this)
    },

    //站点通过
    pass(id, statu) {
      this.seen = true;
      if (statu == 0) {
        this.tip = '商家申请是否通过';
        this.strseen = false;
        this.appid = id;
        this.appstatus = 0;
      } else if (statu == 2) {
        this.strseen = true;
        this.appid = id;
        this.tip = '请输入驳回理由';
        this.appstatus = 2;
      }
    },

    //删除站点
    reject(id, statu) { this.pass(id, statu) },

    chisubmit(param) {
      this.$axios.post(`${this.http.web}application/status`, param, head).then(res => {
        const data = res.data;
        if (data.errCode != 0) {
          this.$message.warning(data.message);
        } else {
          this.sindex();
          this.$message.success('成功');
          this.seen = false;
        }
      })
    },

    submit() {
      const oldparam = { id: this.appid, status: 1 }
      const newparam = { id: this.appid, status: 2, contents: this.str }
      if (this.appstatus == 0) {
        this.chisubmit(oldparam)
      } else if (this.appstatus == 2) {
        this.chisubmit(newparam)
      }
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
