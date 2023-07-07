<template>
  <div>
    <el-card class="el-card">
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" @change="handler" :disabled="scene==0?false:true">
            <el-option v-for="(c1) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id" @change="handler1" :disabled="scene==0?false:true">
            <el-option v-for="(c2) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" @change="handler2" :disabled="scene==0?false:true">
            <el-option v-for="(c3) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqAttr } from '@/api/product/attr/index'
import { useRoute } from 'vue-router'
let categoryStore = useCategoryStore()
defineProps(['scene'])
const handler = () => {
  categoryStore.getC2()
}
const handler1 = () => {
  categoryStore.getC3()
}
let $route = useRoute()
const handler2 = async () => {
  if ($route.path == '/product/attr') {
    let result = await reqAttr(
      categoryStore.c1Id,
      categoryStore.c2Id,
      categoryStore.c3Id,
    )
    if (result.code == 200) {
      categoryStore.attrArr = result.data
    }
  }
}
onMounted(() => {
  categoryStore.c3Id = ''
  categoryStore.getC1()
})
</script>

<style scoped lang="scss">
.el-card {
  width: 96%;
  margin: auto;
  margin-top: 2%;
}
</style>