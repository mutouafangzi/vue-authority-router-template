<!--  -->
<template>
  <div class="menu-wrapper">
    <!-- hidden是false的菜单 -->
    <template v-for="item in routes" v-if="!item.hidden">
      <!-- 不含有子路由 -->
      <router-link v-if="hasShowingOneChildrensFather(item.children) && !item.alwaysShow" :to="item.path">
        <el-menu-item :index="item.path">
          <span>{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <!-- 含有子路由 -->
      <el-submenu v-else :index="item.name">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children">
          <router-link :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    routes: {
      type: Array
    }
  },

  methods: {
    init() {
      // console.log('路由-----', this.routes)
    },
    hasShowingOneChildrensFather(children) {
      // let isShowChildren = children.filter(item=>!item.hiddren)
      if (children.length > 1) {
        // 有多个子路由，默认出现根父路由
        return false
      }
      // 只一个子路由或者没有时，默认不出现父路由，只出现子路由
      // 此时父路由可以加上alwaysShow：true,那么代表默认显示，就会走v-else
      return true
    }
  },

  mounted: function() {
    this.init()
  },

  watch: {
    routes: function(val) {
      console.log(val)
    }
  },

  computed: {},

  components: {}
}

</script>
<style scoped>

</style>