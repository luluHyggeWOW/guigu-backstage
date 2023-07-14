<template>
  <div class="box1">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>

    <div class="sex">
      <div class="p man">
        <p>男士</p>
        <img src="../../images/man.png" alt="">
      </div>
      <div class="p woman">
        <p>女士</p>
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let people = ref('219608')
let charts = ref()

onMounted(() => {})
</script>

<style scoped lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lc.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .top {
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      .num {
        color: red;
      }
      margin-right: 5px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;
    .p {
      margin: 20px;
      width: 115px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        position: absolute;
        color: white;
        top: 580 px;
      }
    }
    .man {
      background: url('../../images/man-bg.png');
    }
    .woman {
      background: url('../../images/woman-bg.png');
    }
  }
}
</style>