<template>
  <div class="box1">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>

    <div class="charts" ref="charts"></div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let people = ref('219608')
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '散点图',
      left: '50%',
      top: '10%',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 40,
      top: 40,
      right: 0,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [
        33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313,
        123, 5, 657, 7,
      ],
      //标记图形设置
      symbol: 'diamond',
      symbolSize: 16,
      //图文标签
      label: {
        show: true,
        position: 'top',
        color: 'red',
      },
      //散点图标记的颜色
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  })
})
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
  .charts {
    width: 360px;
    height: 250px;
    margin-left: -20px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>