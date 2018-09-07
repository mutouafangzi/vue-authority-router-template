<!--  -->
<template>
  <div class="menu-wrapper">
    <!-- hidden是false的菜单 -->
    <template v-for="item in routes" v-if="!item.hidden">
      <!-- 不含有子路由 -->
      <router-link v-if="!item.children" to="item.path">
        <el-menu-item :index="item.path">
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link>
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
      console.log(this.routes)
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