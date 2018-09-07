<template>
  <div>
    <svg class="hamburger" width="30" @click="toggleClick" height="30" xmlns="http://www.w3.org/2000/svg">
      <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
      <g>
        <title>background</title>
        <rect fill="none" id="canvas_background" height="32" width="32" y="-1" x="-1"/>
        <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
        </g>
      </g>
      <g>
        <title>Layer 1</title>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="5.950012" x2="32.5" y1="5.950012" x1="-3.500001" stroke-width="3.5" stroke="#000" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="14.950012" x2="31.5" y1="14.950012" x1="-4.500001" stroke-width="3.5" stroke="#000" fill="none"/>
        <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_3" y2="24.950012" x2="29.5" y1="24.950012" x1="-6.500001" stroke-width="3.5" stroke="#000" fill="none"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    /* isActive: {
      type: Boolean,
      default: false
    }, */
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-contain {
  display: inline-block;
  width: 30px;
  height: 30px;
  .hamburger {
    display: inline-block;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
  }
  .hamburger.is-active {
    transform: rotate(90deg);
  }
}
</style>
