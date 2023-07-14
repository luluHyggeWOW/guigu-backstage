<template>
  <div class="box5">
    <div class="top">
      <p class="title">未来7天游客数量趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let line = ref()
onMounted(() => {
  let mycharts = echarts.init(line.value)
  mycharts.setOption({
    width: 900,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    gird: {
      left: 40,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'line',
        data: [120, 420, 60, 710, 90, 501, 640],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red',
              },
              {
                // 0% 处的颜色
                offset: 1,
                color: 'blue',
              },
            ], // 100% 处的颜色
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box5 {
  // width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lt.png') no-repeat;
  background-size: 100% 100%;
  margin: 0px 20px 0 20px;
  margin-top: 50px;
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
    width: 100%;
    height: 100%;
    margin-left: -30px;
  }
}
</style>