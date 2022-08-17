<template>
  <canvas class="index-canvas" ref="canvas"></canvas>
</template>

<script>
  // import { index_fullScreenAnimation } from '../utils'
  export default {
    mounted(){  //mounted 是vue的生命周期组件，在页面初始化完成后，对html的dom节点进行的一些需要的操作
      // index_fullScreenAnimation(this.$refs.canvas);
    }
  }
</script>

<style scoped lang="less">
  .index-canvas{
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
</style>
