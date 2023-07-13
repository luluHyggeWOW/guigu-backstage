<template>
  <div>
    <el-card class="elcard">
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar">
        <div class="title">
          <h3>{{getTime()}}好！{{userStore.username}}</h3>
          <p>尚硅谷硅谷甄选后台管理</p>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="800px" height="600px"></svg-icon>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
// 首页挂载完毕
onMounted(() => {
  // let userStore = useUserStore()
  // userStore.userInfo()
})
</script>

<style scoped lang="scss">
.elcard {
  width: 96%;
  margin: auto;
  margin-top: 2%;

  .box {
    display: flex;
    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
    .title {
      margin-left: 20px;
      margin-top: 50px;
      h3 {
        font-size: 40px;
        font-weight: 600;
      }
      p {
        margin-top: 50px;
        font-size: 20px;
        color: rgb(136, 136, 136);
      }
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>