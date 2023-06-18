<template>
  <svg :style="{width, height}">
    <use :href="prefix+name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
//接受父组件传过来的的参数
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  color: {
    type: String,
    default: '',
  },
  // 接受父组件传递过来的图标的宽度
  with: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped>
</style>