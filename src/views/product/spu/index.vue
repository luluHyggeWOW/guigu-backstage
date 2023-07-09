<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card class="elcard">
      <div v-show="scene==0">
        <el-button @click="addSpu" type="primary" icon="Plus"
          :disabled="categoryStore.c3Id?false:true">添加SPU</el-button>
        <el-table border style="margin:10px 0;" :data="records">
          <el-table-column label="序号" type="index" align="center" width="150px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName" width="300px"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip=""></el-table-column>
          <el-table-column label="SPU操作" width="300px">
            <template #default={row}>
              <el-button type="primary" icon="Plus" size="small"></el-button>
              <el-button @click="updateSpu(row)" type="primary" icon="Edit" size="small"></el-button>
              <el-button type="primary" icon="View" size="small"></el-button>
              <el-button type="primary" icon="Delete" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="pageNo" :background="true" :page-sizes="[10,15,20,25]"
          v-model:page-size="limit" :prev-icon="9" layout="prev, pager, next, jumper,->,total, sizes" :total="total"
          @current-change="getHasSup" @size-change="changeSize">
        </el-pagination>
      </div>
      <SpuForm ref="spuform" @changeScene="changeScene" v-show="scene==1"></SpuForm>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { ref, watch } from 'vue'
import { reqHasSpu } from '@/api/product/spu/index'
import { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'
let categoryStore = useCategoryStore()
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let scene = ref<number>(1)
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let records = ref<Records>([])
let total = ref<number>(0)
let spuform = ref<any>([])
const getHasSup = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
const changeSize = () => {
  getHasSup()
}
const addSpu = () => {
  scene.value = 1
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件方法获取完整已有的SPU的数据
  spuform.value.initHasSpuData(row)
}
const changeScene = (num: number) => {
  scene.value = num
}

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSup()
  },
)
</script>

<style scoped lang="scss">
.elcard {
  width: 96%;
  margin: auto;
  margin-top: 2%;
}
</style>