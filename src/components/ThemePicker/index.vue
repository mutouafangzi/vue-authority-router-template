<!--  -->
<template>
   <el-color-picker
     class="theme-picker"
     popper-class="theme-picker-dropdown"
     v-model="theme">
   </el-color-picker>
</template>

<script>
export default {
  data() {
    return {
      theme: '#409EFF'
    }
  },
  watch: {
    /* theme(val) {
      if (typeof val !== 'string') return
    } */
  },

  methods: {},

  computed: {},

  components: {}
}

</script>
<style rel="stylesheet/scss" lang="scss" >
.theme-picker {
  .el-color-picker__trigger {
    vertical-align: middle;
  }
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>