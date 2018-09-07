<!--  -->
<template>
  <div>
    <el-menu
      mode="vertical"
      default-active="$route.path"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import sidebarItem from './sidebarItem'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },

  methods: {},

  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ])
  },

  watch: {
    isCollapse() {

    }
  },

  components: {
    sidebarItem
  }
}

</script>
<style scoped>

</style>