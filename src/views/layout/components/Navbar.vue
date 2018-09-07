<!--  -->
<template>
  <el-menu 
    :default-active="activeIndex"
    class="navbar"
    mode="horizontal"
    background-color="#ffffff"
    text-color="#fff">
    <!-- 侧边菜单栏的折叠与打开 -->
    <hamburger class="hamburger-container"  :toggleClick="toggleSidebar"></hamburger>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 全屏按钮 -->
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <!-- 语言选择按钮 -->
      <lang-select class="international right-menu-item"></lang-select>
      <!-- 主题选择按钮 -->
      <el-tooltip effect="dark" content="主题选择" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="@/assets/avatar.jpg" alt="#">
          <i class="icon iconfont icon-Angle-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>项目地址</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
// 打开侧边栏的旋转图标
import Hamburger from '@/components/Hamburger'
// 面包屑组件
import Breadcrumb from '@/components/Breadcrumb'
// 全屏按钮
import Screenfull from '@/components/Screenfull'
// 主题颜色选择
import ThemePicker from '@/components/ThemePicker'
// 语言选择
import LangSelect from '@/components/LangSelect'
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },

  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSideBar')
    }
  },

  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },

  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    ThemePicker,
    LangSelect
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container{
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}


</style>