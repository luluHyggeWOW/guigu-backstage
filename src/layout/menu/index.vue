<template>
  <div>
    <template v-for="(item) in menuList" :key="item.path">
      <el-menu-item :index="item.path" v-if="!item.children&&!item.meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>

          <span>{{item.meta.title}}</span>
        </template>
      </el-menu-item>
      <el-menu-item :index="item.children[0].path"
        v-if="item.children&&item.children.length==1&&!item.children[0].meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{item.children[0].meta.title}}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon">11</component>
          </el-icon>
          <span v-if="!LayOutSettingStore.fold">{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
let $router = useRouter()
// 获取父组件的路由数组
defineProps(['menuList'])
const goRoute = (vc: any) => {
  // 路由跳转
  $router.push(vc.index)
}
</script>
<script lang="ts" >
export default {
  name: 'Menu',
}
</script>

<style scoped>
</style>