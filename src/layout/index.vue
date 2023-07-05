<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="LayOutSettingStore.fold" :default-active="$route.path" background-color="#001529"
          :ollapse-transition='false' text-color="white">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
      <Main></Main>
    </div>

  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
// 获取路由对象
import { useRoute } from 'vue-router'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
@import '@/styles/varuable.scss';
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    position: fixed;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logo-height);
      color: white;
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    // background: cyan;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
    height: 2000px;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>