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
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
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
    series: [
      {
        type: 'bar',
        data: [58],
        barWdith: 20,
        z: 10,
        itemStyle: {
          color: 'blue',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWdith: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'hotpink',
          borderRadius: 20,
        },
      },
    ],
    gird: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    width: 290,
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
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 30px;
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
        margin-top: -95px;
      }
    }
    .man {
      background: url('../../images/man-bg.png');
    }
    .woman {
      background: url('../../images/woman-bg.png');
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
    margin-bottom: 5px;
    p {
      margin-left: 60px;
      margin-right: 60px;
    }
  }
  .charts {
    width: 290px;
    height: 20px;
    margin-left: -20px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>