webpackJsonp([14],{kscO:function(t,e){},oCNf:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-body"},[s("div",{staticClass:"page-header"},[s("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[s("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),t._v(" "),s("el-breadcrumb-item",[t._v("配置管理")]),t._v(" "),s("el-breadcrumb-item",[t._v("基本配置")])],1)],1),t._v(" "),s("div",{staticClass:"box"},[s("el-form",{ref:"form",attrs:{model:t.form}},[s("el-form-item",{attrs:{label:"平台名称"}},[s("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"联系电话"}},[s("el-input",{model:{value:t.form.mobile,callback:function(e){t.$set(t.form,"mobile",e)},expression:"form.mobile"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"联系地址"}},[s("el-input",{model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"公告"}},[s("el-input",{model:{value:t.form.notice,callback:function(e){t.$set(t.form,"notice",e)},expression:"form.notice"}})],1),t._v(" "),s("div",[t._v(" "+t._s(this.$store.state.newlist))]),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"success"},on:{click:t.onSubmit}},[t._v("提交")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.reset}},[t._v("重置")])],1)],1)],1)])},staticRenderFns:[]};var i=s("VU/8")({data:function(){return{form:{title:"",address:"",mobile:"",notice:""}}},created:function(){this.allConfig()},methods:{allConfig:function(){var t=this,e={headers:{"api-token":this.$sign(),Authorization:this.http.vtoken}};this.http.axios.get(this.http.url+"config/all",e).then(function(e){var s=e.data.data;t.form.title=s.title,t.form.address=s.send_address,t.form.mobile=s.tel,t.form.notice=s.public_msg,t.form.wCount=s.mchid,t.form.wPassword=s.appkey,t.form.title=s.title})},onSubmit:function(){var t=this,e={headers:{"api-token":this.$sign(),Authorization:this.http.vtoken}},s={title:this.form.title,send_address:this.form.address,tel:this.form.mobile,public_msg:this.form.notice};this.http.axios.post(this.http.url+"config/base",s,e).then(function(e){var s=e.data;0!==s.errCode?t.$message.warning(s.message):(t.$message.success("提交成功"),t.$router.push({name:"home"}))}).catch(function(e){var s=e.response.data;t.$message.info(s.message)})},reset:function(){for(var t in this.form)this.form[t]=""}}},o,!1,function(t){s("kscO")},"data-v-7ff02869",null);e.default=i.exports}});
//# sourceMappingURL=14.fa8ec0c85f2bbcf10c42.js.map