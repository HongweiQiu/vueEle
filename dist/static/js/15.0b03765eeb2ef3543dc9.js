webpackJsonp([15],{"58Mc":function(t,e){},vgge:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("BO1k"),n=a.n(s),i={data:function(){return{list:[{label:"名称",prop:"name"},{label:"姓名",prop:"full_name"},{label:"手机",prop:"mobile"},{label:"电子邮箱",prop:"email"},{label:"角色",prop:"role.name"}],loading:!0,query:"",table:[],tip:"",str:"",seen:!1,strseen:!1,appid:"",appstatus:"",arrPage:this.$store.state.showNum,num:"",page:"1",count:null,currentPage4:parseInt(localStorage.getItem("apply"))}},created:function(){this.sindex()},methods:{search:function(){this.sindex()},handleSizeChange:function(t){this.num=t,this.sindex()},handleCurrentChange:function(t){this.page=t,localStorage.setItem("apply",this.page),this.sindex()},sindex:function(){var t=this,e=this.query,a=this,s=null==localStorage.getItem("apply")?1:localStorage.getItem("apply"),i=""==this.num?this.arrPage[0]:this.num,r=this.http.web+"application/list?page="+s+"&&num="+i,l=e?r+"&&search=status:"+e+";name:"+e:""+r;this.$axios.get(l).then(function(e){var s=e.data.data,i=s.collection;t.count=s.total,t.table=[];var r=!0,l=!1,o=void 0;try{for(var u,c=n()(i);!(r=(u=c.next()).done);r=!0){var p=u.value;t.table.push(p)}}catch(t){l=!0,o=t}finally{try{!r&&c.return&&c.return()}finally{if(l)throw o}}setTimeout(function(){return a.loading=!1},500)})},pass:function(t,e){this.seen=!0,0==e?(this.tip="商家申请是否通过",this.strseen=!1,this.appid=t,this.appstatus=0):2==e&&(this.strseen=!0,this.appid=t,this.tip="请输入驳回理由",this.appstatus=2)},reject:function(t,e){this.pass(t,e)},chisubmit:function(t){var e=this;this.$axios.post(this.http.web+"application/status",t,head).then(function(t){var a=t.data;0!=a.errCode?e.$message.warning(a.message):(e.sindex(),e.$message.success("成功"),e.seen=!1)})},submit:function(){var t={id:this.appid,status:1},e={id:this.appid,status:2,contents:this.str};0==this.appstatus?this.chisubmit(t):2==this.appstatus&&this.chisubmit(e)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-body"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),a("el-breadcrumb-item",[t._v("商家管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("商家申请列表")]),t._v(" "),a("router-link",{attrs:{to:{name:"w-newapply"}}},[a("m-button",{staticClass:"add",attrs:{type:"success",size:"mini"}},[t._v("添加")])],1),t._v(" "),a("m-button",{staticClass:"search",attrs:{type:"success",size:"mini"},on:{click:t.search}},[t._v("查询")]),t._v(" "),a("m-input",{attrs:{placeholder:"请输入你要查找的名称",theme:"success"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.search()}},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}})],1)],1),t._v(" "),a("div",{staticClass:"box"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.table,"max-height":"550","default-sort":{prop:"created_at",order:"descending"},"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading"}},[a("el-table-column",{attrs:{label:"#",type:"index"}}),t._v(" "),t._l(t.list,function(t){return a("el-table-column",{key:t.label,attrs:{label:t.label,prop:t.prop}})}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("m-button",{attrs:{type:"success",size:"mini",disabled:1==e.row.status||2==e.row.status},on:{click:function(a){t.pass(e.row.id,e.row.status)}}},[t._v("通过")]),t._v(" "),a("m-button",{attrs:{type:"warning",size:"mini",disabled:1==e.row.status||0==e.row.status},on:{click:function(a){t.reject(e.row.id,e.row.status)}}},[t._v("驳回")])]}}])})],2),t._v(" "),a("el-dialog",{attrs:{visible:t.seen},on:{"update:visible":function(e){t.seen=e}}},[a("h2",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.tip))]),t._v(" "),t.strseen?a("el-input",{attrs:{autocomplete:"off"},model:{value:t.str,callback:function(e){t.str=e},expression:"str"}}):t._e(),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.seen=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确 定")])],1)],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{display:"flex","padding-top":"1%"}},[a("el-pagination",{staticStyle:{margin:"0 auto"},attrs:{"current-page":t.currentPage4,"page-sizes":t.arrPage,"page-size":3,size:20,layout:"total, sizes, prev, pager, next, jumper",total:t.count},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"left",37,e.key)?"button"in e&&0!==e.button?null:void t.left():null}}})],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("58Mc")},null,null);e.default=l.exports}});
//# sourceMappingURL=15.0b03765eeb2ef3543dc9.js.map