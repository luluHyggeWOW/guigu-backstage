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
      <el-popover placement="top-start" title="主题设置" :width="250" trigger="hover">
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch @change="changeDark" v-model="dark" active-icon="Moon" inactive-icon="Sunny" inline-prompt
              size="large" style="--el-switch-on-color: black; --el-switch-off-color: #409EFF; margin-top:-3px" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size=" small" icon="Setting" circle></el-button>
        </template>
      </el-popover>
      <img :src="userStore.avatar" style="width:30px;height:30px;margin:10px;border-radius:50%">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userStore.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const dark = ref(false)
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
  console.log(userStore.avatar, userStore.username)
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

const logout = async () => {
  // 1 向服务器发请求【退出登录接口】
  // 2 苍古用户数据清空【token|名字、头像】
  // 3 跳转到登录页面
  await userStore.userLogout()
  // 跳转回登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
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
  // background-image: linear-gradient(
  //   to right,
  //   white,
  //   rgb(212, 211, 211),
  //   rgb(190, 188, 188)
  // );
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