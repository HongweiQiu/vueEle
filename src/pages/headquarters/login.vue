<template>
  <div class="fullscreen">
    <div class="login-box">
      <div style="text-align: center">
        <img src="./../../assets/caidj_logo.jpg" alt="" class="logo">
      </div>
      <p class="text-tips">你好，欢迎登录</p>
      <form action="" class="login-form">
        <div class="m-list-group">
          <div class="m-list-group-item">
            <input type="text" placeholder="请输入用户名" class="m-input" v-model="username" prefix-icon="el-icon-user">
          </div>
          <div class="m-list-group-item">
            <input type="password" prefix-icon='el-icon-shopping-bag-2' placeholder="请输入密码" class="m-input" v-model="password">
          </div>
        </div>
        <button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>
      </form>
      <div style="margin-top: 50px"></div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      isLoging: false 
    }
  },
  methods: {
  
    handleLogin () {
       this.isLoging = true;
       const _this=this;
       const url ='api/login';
       const params= {username:this.username, password:this.password }
       this.$api.login(url,params,'home',this)  
       setTimeout(()=>{ _this.isLoging=false},1000)  
     
}
  }
}
</script>
<style type="text/css">
.m-list-group {
  border-radius: 3px;
  padding: 0;
  margin: 0 0 20px;
}

.m-list-group .m-list-group-item {
  position: relative;
  display: block;
  padding: 6px 10px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #e7ecee;
}

.m-list-group .m-list-group-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.m-list-group .m-list-group-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #F4F5F5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  position: relative;
  width: 330px;
  margin: 0 auto;
  padding: 0px 15px;
}

.login-box .logo {

  margin-bottom: 30px;
}

.login-box .text-tips {
  text-align: center;
  color: #909DB7;
}

.login-box .m-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.login-box .m-btn {
  font-size: 18px;
  width: 100%;
  color: #fff;
  background-color: #36c1fa;
  display: inline-block;
  padding: 10px 12px;
  margin-bottom: 5px;
  line-height: 1.42857143;
  text-align: center;
  cursor: pointer;
  outline: none;
  border-radius: 2px;
  border: 1px solid #36c1fa;
  box-sizing: border-box;
  text-decoration: none;
}

.login-box .m-btn.m-btn-text {
  background: #fff;
  color: #36C1FA;
}

.login-box .m-btn:hover {
  background-color: #2DB7F5;
}

.login-box .m-btn.m-btn-text:hover {
  background-color: #F4F5F5;
}

.login-box .m-btn:active {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .login-box {
    width: auto;
  }
}

</style>
