<template>
  <div class="box4">
    <div class="map" ref="map"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mycharts = echarts.init(map.value)
  mycharts.setOption({
    backgroundColor: 'transparent',
    geo: {
      map: 'china',
      roam: true,
      left: 50,
      top: 100,
      right: 50,
      bottom: -200,
      label: {
        show: true,
        color: 'white',
        fontSize: '14',
      },
      itemStyle: {
        borderColor: '#0FA3F0',
        borderWidth: 1,
        areaColor: '#04609e',
        shadowColor: 'rgba(1,34,73,0.48)',
        shadowBlur: 10,
        shadowOffsetX: -10,
        shadowOffsetY: 10,
      },
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box4 {
  .map {
    width: 100%;
    height: 100%;
    // background: #04609e;
  }
}
</style>