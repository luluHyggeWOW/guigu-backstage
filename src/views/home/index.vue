<template>
  <div>
    home11111
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore
// 首页挂载完毕
onMounted(() => {
  // let userStore = useUserStore()
  // userStore.userInfo()
})
</script>

<style scoped>
</style>