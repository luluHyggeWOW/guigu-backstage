<template>
  <div class="box2">
    <div class="top">
      <p class="title">年龄比例</p>
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
      text: '游客消费统计',
      left: '70%',
      textStyle: {
        color: 'white',
      },
    },

    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭',
          },
        ],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box2 {
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
    width: 400px;
    height: 260px;
    margin-left: -20px;
    margin-top: 10px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>