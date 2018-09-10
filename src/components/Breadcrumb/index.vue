<!-- 一个面包屑组件 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path"
        v-if="item.meta.title">
        <!-- 当前页面的路由 -->
        <span
          v-if="item.redirect=='noredirect'|| index==levelList.length-1"
          class="no-redirect">
        {{item.meta.title}}
        </span>
        <!-- 当前页面以上的父路由 -->
        <router-link v-else :to="item.redirect||item.path">
          {{item.meta.title}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    }
  },

  methods: {
    initBreadcrumb() {
      let breadcrumbName = this.$route.matched.filter(item=> item.name)
      const first = breadcrumbName[0]
      if (first && first.name !== 'dashboard') {
        breadcrumbName = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(breadcrumbName)
      }
      // console.log('路由', this.$route.matched, breadcrumbName)
      this.levelList = breadcrumbName
    }
  },

  created() {
    console.log('执行了created')
    this.initBreadcrumb()
  },

  watch: {
    $route() {
      this.initBreadcrumb()
    }
  },

  computed: {},

  components: {}
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>