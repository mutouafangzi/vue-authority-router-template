<!--  -->
import func from './vue-temp/vue-editor-bridge';
<template>
  <div id='wrap'>
    <div class="box" ref="boxwrap" :style="setBoxStyle()">
      <div 
        id="imgWrap"
        :key="$index"
        v-for="(item,$index) in polygonData"
        :style="setStyle($index)">
        <img :src="item.imgPath" height="350" width="600">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polygonData: [
        {
          title: '人生图鉴1',
          imgPath: require('./img/人生1.jpg')
        },
        {
          title: '人生图鉴2',
          imgPath: require('./img/人生2.jpg')
        },
        {
          title: '人生图鉴3',
          imgPath: require('./img/人生3.jpg')
        },
        {
          title: '人生图鉴4',
          imgPath: require('./img/人生4.jpg')
        },
        {
          title: '人生图鉴5',
          imgPath: require('./img/人生5.jpg')
        },
        {
          title: '人生图鉴6',
          imgPath: require('./img/人生6.jpg')
        },
        {
          title: '人生图鉴7',
          imgPath: require('./img/人生7.jpg')
        },
        {
          title: '人生图鉴8',
          imgPath: require('./img/人生8.jpg')
        },
        {
          title: '人生图鉴9',
          imgPath: require('./img/人生9.jpg')
        }
      ]
    };
  },

  methods: {
    setStyle(index) {
      let that = this
      // 旋转每个角度
      let deg = 360/that.polygonData.length
      // 变幻时原点在z轴上移动距离
      let originZ = 320/Math.tan(deg/2/180*Math.PI)
      // 变换的原点
      let originCoord = 'center center '+ -originZ +'px'
      // 每次变换旋转角度
      let rotateDeg = 'rotateY('+ deg*index+'deg)'
      // 样式的拼凑
      let Obj = {
        width: 600+'px',
				height: 350+'px',
        transformOrigin: originCoord, 
        transform: rotateDeg
      }
      // console.log(Obj)
      return Obj
    },
    setBoxStyle() {
      let that = this
      // 旋转每个角度
      let deg = 360/that.polygonData.length
      // 变幻时原点在z轴上移动距离
      let originZ = 320/Math.tan(deg/2/180*Math.PI)
      // 变换的原点
      let originCoord = 'center center '+ -originZ +'px'
      return {transformOrigin: originCoord}
    }
  },

  mounted() {
  },

  computed: {
   
  },

  components: {}
}

</script>

<style rel="stylesheet/scss" lang="scss">

  @import "src/styles/mixin.scss";

  #wrap{
    perspective: 800px;
    width: 600px;
    height: 350px;
    padding: 100px;
    margin: 100px 25%;
    .box{
      position: relative;
      transform-style: preserve-3d;
      width: 600px;
      height: 350px;
      transition: 60s transform;
      div{
				position: absolute;
				/* line-height: 1000px;
				text-align: center; */
				background: pink;
				border: 1px solid red;
        overflow: hidden;
			}
    }
    &:hover .box{
      transform: rotateY(-360deg);
    }
  }

</style>