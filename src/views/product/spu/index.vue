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
              <el-button type="primary" icon="Plus" size="small" @click="addSku(row)"></el-button>
              <el-button @click="updateSpu(row)" type="primary" icon="Edit" size="small"></el-button>
              <el-button type="primary" icon="View" size="small" @click="findSku(row)"></el-button>

              <el-popconfirm :title="`你确定要删除 ${row.spuName} 吗？`" width="180px" @confirm="removeSpu(row)">
                <template #reference>
                  <el-button type="primary" icon="Delete" size="small"></el-button>
                </template>
              </el-popconfirm>
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
      <SkuForm ref="skuform" @changeScene="changeScene" v-show="scene==2"></SkuForm>
      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template>
              <img :src="row.skuDefaultImg" style="width:100px;height:100px" alt="">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus'
import {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
let categoryStore = useCategoryStore()
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let records = ref<Records>([])
let total = ref<number>(0)
let spuform = ref<any>([])
let skuform = ref<any>([])
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)
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
  // 调用子组件方法 初始化数组
  spuform.value.initAddSpu(categoryStore.c3Id)
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件方法获取完整已有的SPU的数据
  spuform.value.initHasSpuData(row)
}
const changeScene = (Obj: any) => {
  scene.value = Obj.flag
  // 再次获取全部已有spu
  if (Obj.params == 'update') {
    getHasSup(pageNo.value)
  } else {
    getHasSup()
  }
}
const addSku = (row: SpuData) => {
  // 点击添加sku按钮
  scene.value = 2
  // 调用子组件方法初始化添加sku
  skuform.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
const findSku = async (row: SpuData) => {
  let result = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}
const removeSpu = async (row: any) => {
  let result = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSup(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 路由器销毁前清空仓库数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
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