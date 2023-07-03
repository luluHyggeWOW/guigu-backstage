<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p :class="{fold:LayOutSettingStore.fold?true:false}">{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
// 引入logo标题配置文件
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  height: $base-menu-logo-height;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 40px 20px 40px 5px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    // margin-top: 10px;
  }
  p {
    font-size: $base-menu-fontsize;
    margin-left: 10px;
    // transition: all 3s;
    min-width: 220px;
    &.fold {
      display: none;
    }
  }
}
</style>