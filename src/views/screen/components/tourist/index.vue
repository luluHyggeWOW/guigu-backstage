<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量：<span class="num">99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item,index) in people" :key="index">{{item}}</span>
      <span class="ren">人</span>
    </div>
    <v-chart class="charts" ref="charts"></v-chart>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('219608')
let charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.5, 0.4, 0.3],
        color: ['red', '#0f0', 'rgb(0, 0, 255)'],
        itemStyle: {
          opacity: 0.6,
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9,
          },
        },
        radius: '90%',
      },
    ],
    gird: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url('../../images/dataScreen-main-lt.png') no-repeat;
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
  .number {
    display: flex;
    margin: 50px 20px 0 20px;
    span {
      flex: 1;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: url('../../images/total.png');
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 30px;
      font-weight: 600;
    }
    .ren {
      font-size: 25px;
      font-weight: 400;
    }
  }
  .charts {
    width: 400px;
    height: 250px;
    margin: 20px;
  }
}
</style>