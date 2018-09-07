<!--  -->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <p>这是放主要内容的地方</p>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
    }
  },

  methods: {},

  computed: {

  },

  components: {}
}

</script>
<style scoped>

</style>