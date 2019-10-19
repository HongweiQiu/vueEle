<template>
  <div>
    <link rel="stylesheet" href="//at.alicdn.com/t/font_1383822_i60urg1ibj.css">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <el-submenu :index="index+''" v-for="(item,index) in menus" :key="item.title">
        <template slot="title">
          <i class="iconfont">&#xe6a0;</i>
          <!--  <i class="iconfont icon-jian" ></i>
          <i class="el-icon-location"  id='icon'></i> -->
          <span v-if='isShow' >{{item.title}}</span> 
        </template>
        <el-menu-item v-if='isShow' v-for="second in item.children" index="1-4-1" :key="second.title" >
          <router-link :to="{path:second.href}" class='link' >
            <i v-bind:class="[second.icon]" class="iconfont">&#xe6a0;</i>
            {{second.title}}
          </router-link>
         
        </el-menu-item>
      </el-submenu>
    </el-menu>


  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  data() {
    return {
      menus: [
        {title:'商家管理',
        children:[
        {title:'商家列表',href:'/store/list'},
        {title:'商家申请列表',href:'/store/apply' },
        {title:'图标',href:'/store/echar' }
        ]
      } 
      ],
      defaultActive: 'home',

    }
  },
  computed: {
    isShow() {
      return this.$store.state.show
    }
  },
  watch: {
    $route() {
      this.setCurrentRoute()
    }
  },
  methods: {
    setCurrentRoute() {
      this.defaultActive = this.$route.name
    },
  },
  created() {
  
    this.setCurrentRoute()
  }
}

</script>
<style type="text/css" scoped>
.el-menu.side-menu {
  border-right: none;
}

.el-menu .fa {
  font-size: 18px;
  margin-right: 7px;
  display: inline-block;
  width: 23px;
  text-align: center;
}

.el-menu.side-menu .el-menu-item.is-active {
  color: #409EFF;
  border-right: solid 2px #36c1fa;
  background: #eef3f5;
}

.link {
  display:block;
  padding-left: 20px;
  font-size: 12px;
  color: black;
}

.el-menu {
  background: none;
}

@font-face {
  font-family: 'iconfont';
  /* project id 1383822 */
  src: url('//at.alicdn.com/t/font_1383822_i60urg1ibj.eot');
  src: url('//at.alicdn.com/t/font_1383822_i60urg1ibj.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1383822_i60urg1ibj.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1383822_i60urg1ibj.woff') format('woff'),
    url('//at.alicdn.com/t/font_1383822_i60urg1ibj.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1383822_i60urg1ibj.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

</style>
