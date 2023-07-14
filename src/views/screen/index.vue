<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <div class="leftbox">
            <Tourist class="tourist"></Tourist>
            <Sex class="sex"></Sex>
            <Age class="age"></Age>
          </div>

        </div>
        <div class="center">left</div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
let screen = ref()
// 获取屏幕倍数
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监听窗口
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
        .leftbox {
          width: 400px;
          height: 1024px;
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          .tourist {
            flex: 1.2;
          }
          .sex {
            flex: 1;
          }
          .age {
            flex: 1;
          }
        }
      }
      .center {
        height: 1040px;
        flex: 1.5;
      }
      .right {
        flex: 1;
        height: 1040px;
      }
    }
  }
}
</style>