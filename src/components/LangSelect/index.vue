<!--  -->
<template>
  <el-dropdown class="international">
    <div>
      <i class="icon iconfont icon-language international-icon"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>中</el-dropdown-item>
      <el-dropdown-item>英</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  methods: {},

  computed: {},

  components: {}
}

</script>
<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>