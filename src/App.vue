<template>
  <div class="box">
    测试axios
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import requset from '@/utils/request'
import { onMounted } from 'vue'
onMounted(() => {
  requset({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '123456',
    },
  }).then((res: any) => {
    console.log(res)
  })
})
</script>

<style scoped lang="scss">
.box {
  color: red;
}
</style>
