<template>
  <m-navbar :theme="theme.theme.headerTheme">
    <m-navbar-brand>
      <i :class="{
        'el-icon-more': !mini,
        'el-icon-more-outline': mini
      }" @click="handleSwitchSide" class="side-switch"></i>
    </m-navbar-brand>
    <m-nav>
      <m-nav-item>
        <router-link :to="{ name: 'b-home'}">首页</router-link>
      </m-nav-item>
    </m-nav>
    <m-nav align="right">
      <m-nav-item padding="0">
        <m-dropdown align="right" padding="0 10px" v-if="user">
          <a href="javascript:;" style="display: inline-block; padding: 0px; color: inherit">
            <img alt="" src="./../../assets/user.jpg" style="border-radius: 3px;vertical-align: middle;">
            <span>{{user.username}}</span>
            <span class="caret"></span>
          </a>
          <m-dropdown-panel>
        
            <m-dropdown-item>
              <router-link :to="{name:'b-modify'}">修改密码</router-link>
            </m-dropdown-item>
            <div class="test-line"></div>
            <m-dropdown-item><span @click='quit'>退出账号</span></m-dropdown-item>
              <m-dropdown-item><span @click='refresh'>刷新token</span></m-dropdown-item>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item>
      <m-nav-item padding="0 5px">
        <a @click.stop.prevent="handleSwitchScreen" href="#">
          <i :class="isFullScreen ? 'fa-compress' : 'fa-expand'" class="fa"></i>
        </a>
      </m-nav-item>
      <m-nav-item padding="0">
        <m-dropdown align="right" padding="0 10px">
          <a href="#" style="padding:0 0px; color: inherit">
            <i class="fa fa-gears"></i>
          </a>
          <m-dropdown-panel style="width: 200px; min-height: 100px;">
            <el-form>
              <el-form-item label="侧边栏">
                <el-switch @change="handleSwitchHideSide" v-model="showAside"/>
              </el-form-item>
              <el-form-item label="主题">
                <el-select style="width: 100px" v-model="themeType">
                  <el-option :key="theme.label" :label="theme.label" :value="theme.name"
                             v-for="theme in themes"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </m-dropdown-panel>
        </m-dropdown>
      </m-nav-item>
    </m-nav>
  </m-navbar>
</template>
<script type="text/javascript">
    import {mapActions, mapState} from 'vuex'
    import {
        requestFullScreen,
        exitFullscreen
    } from '@/utils'
    import themes from './../../components/theme'

    export default {
        name: 'app-header',
        data() {
            return {
                user: true,
                mini: false,
                isFullScreen: false,
                themes,
                themeType: '',
                showAside: true,
                theme: {theme: {headerTheme: 'info'}}
            }
        },
        watch: {
            themeType(val) {
                this.theme = this.themes.find(e => e.name === val) || {}
                this.$emit('set-theme', this.theme)
                localStorage.setItem('theme', val)
                //主题切换
                const themeColor = localStorage.getItem('theme');
                // console.log(themeColor=='default');
                var style;
                if ((themeColor == 'default') || (themeColor == 'white')) {

                    style = document.getElementById('style').href = 'static/css/drak2.css';
                } else {
                    return document.getElementById('style').href = '../../static/css/drak.css';
                }
            }
        },

        methods: {

           refresh(){

            this.$api.refresh('business/refresh',{refreshToken:  localStorage.getItem('refresh_token')})
           },


            //退出登录
            quit() {this.$api.exit('business/logout','b-login'); },

            handleSwitchSide() {
                this.mini = !this.mini
                this.$store.commit('IsShow')
                this.$emit('switch', this.mini)
            },
            handleSwitchScreen() {
                if (this.isFullScreen) {
                    exitFullscreen()
                    this.isFullScreen = false
                } else {
                    requestFullScreen()
                    this.isFullScreen = true
                }
            },
            handleSwitchHideSide() {
                this.$emit('hide-side')
            },
        },

        created() {
            // this.access()

            var theme = localStorage.getItem('theme') || 'default'
            this.themeType = theme
        }
    }

</script>
<style type="text/css">
  .side-switch {
    display: inline-block;
    font-size: 32px;
    cursor: pointer;
    color: inherit;
    margin-top: 10px;
  }

  .side-switch:hover {
    color: #fff;
  }

</style>
