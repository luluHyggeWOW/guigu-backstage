<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold?'Fold':'Expand'"></component>
      </el-icon>
      <el-breadcrumb separator-class="ArrowRight">
        <el-breadcrumb-item :to="{ path: `${item.path}` }" v-for="(item,index) in $route.matched" :key="index"
          v-show="item.meta.title">
          <el-icon style="margin:0px 2px;">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin:0px 5px;">{{item.meta.title}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img :src="userStore.avatar" style="width:30px;height:30px;margin:10px;border-radius:50%">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    // requestFullscreen全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    white,
    rgb(212, 211, 211),
    rgb(190, 188, 188)
  );
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      // color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>