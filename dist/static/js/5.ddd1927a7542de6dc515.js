webpackJsonp([5],{MlDg:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-body"},[a("div",{staticClass:"page-header"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),e._v(" "),a("el-breadcrumb-item",[e._v("站点管理")]),e._v(" "),a("el-breadcrumb-item",[e._v("人员修改")])],1)],1),e._v(" "),a("div",{staticClass:"box"},[a("el-form",{ref:"form",attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"角色"}},[a("el-input",{model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{model:{value:e.form.full_name,callback:function(t){e.$set(e.form,"full_name",t)},expression:"form.full_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{placeholder:"格式为字母数字，大于6位小于20位"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"电子邮箱"}},[a("el-input",{model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),e._v(" "),a("div",{staticClass:"clear"}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"success"},on:{click:e.onSubmit}},[e._v("立即修改")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.reset}},[e._v("重置")])],1)],1)],1)])},staticRenderFns:[]};var o=a("VU/8")({data:function(){return{form:{id:"",full_name:"",name:"",mobile:"",email:"",password:""}}},methods:{onSubmit:function(){var e=this,t={headers:{"api-token":this.$sign(),Authorization:this.http.vtoken}},a={id:this.$route.query.id,role_id:this.form.id,full_name:this.form.full_name,name:this.form.name,mobile:this.form.mobile,email:this.form.email,password:this.form.password};this.http.axios.post(this.http.url+"user/update",a,t).then(function(t){var a=t.data;0!==a.errCode?e.$message.warning(a.message):(e.$message.success("修改成功成功"),e.$router.push({name:"userIndex"}))}).catch(function(t){var a=t.response.data;e.$message.info(a.message)})},reset:function(){for(var e in this.form)this.form[e]=""}}},r,!1,function(e){a("wxXL")},"data-v-fd787eda",null);t.default=o.exports},wxXL:function(e,t){}});
//# sourceMappingURL=5.ddd1927a7542de6dc515.js.map