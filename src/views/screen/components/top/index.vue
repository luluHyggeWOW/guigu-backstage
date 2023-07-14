<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="$router.push('/home')">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{time}}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
// 存储时间
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref(0)
let $router = useRouter()
onMounted(() => {
  setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  color: #29fcff;
  .left {
    flex: 1;
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    .lbtn {
      width: 130px;
      height: 40px;
      float: right;
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #29fcff;
      cursor: pointer;
    }
  }
  .center {
    flex: 1.5;
    .title {
      height: 74px;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      font-size: 30px;
      letter-spacing: 0.4em;
      color: #29fcff;
    }
  }
  .right {
    flex: 1;
    background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    .rbtn {
      width: 130px;
      height: 40px;
      float: left;
      background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #29fcff;
      cursor: pointer;
    }
    .time {
      text-align: center;
      line-height: 40px;
      font-size: 17px;
      color: #29fcff;
      margin-right: 20px;
    }
  }
}
</style>