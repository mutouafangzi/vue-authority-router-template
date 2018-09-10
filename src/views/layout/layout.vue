<!-- 首页 -->
<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
    <!-- <el-row>
      <el-col :span="3">
        <sidebar class="sidebar-container"></sidebar>
      </el-col>
      <el-col :span="21">
        <div class="main-container">
          <navbar></navbar>
          <app-main></app-main>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters([
        'newrouter'
    ])
  },

  methods: {
    logout() {
      this.$store.dispatch('Logout').then(() => {
          this.$router.push({ path: '/login' })
      }).catch(err => {
          this.$message.error(err)
      })
    }
  },

  created() {},

  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container{
    height: 100%;
  }
}
/* .drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
} */
</style>