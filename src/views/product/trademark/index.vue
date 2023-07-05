<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件 展示已有 -->
    <el-table :data="trademarkArr" style="width: 100%" border>
      <el-table-column prop="index" label="序号" width="100%" align="center" type="index"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="400px"></el-table-column>
      <el-table-column label="品牌Logo">
        <template #="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width:150px;min-height:50px">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{row,$index}">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo"
      :background="true" :page-sizes="[6,12,18,24]" :page-size="limit"
      layout=" prev, pager, next, jumper,->,total, sizes" :total="total">
    </el-pagination>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records } from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(6)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
const getHasTrademark = async () => {
  let result = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    console.log(result)
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(async () => {
  await getHasTrademark()
})
</script>

<style scoped lang="scss">
.box-card {
  width: 96%;
  margin: auto;
  margin-top: 2%;
}
</style>