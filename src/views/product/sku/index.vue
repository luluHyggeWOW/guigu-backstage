<template>
  <div>
    <el-card class="elcard">
      <el-table border :data="skuArr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="名称" align="center" prop="skuName" show-overflow-tooltip width="200px"></el-table-column>
        <el-table-column label="描述" align="center" prop="skuDesc" show-overflow-tooltip width="500px"></el-table-column>
        <el-table-column label="图片" align="center" width="230px">
          <template #default="{row}">
            <img :src="row.skuDefaultImg" alt="" style="height:100px;">
          </template>
        </el-table-column>
        <el-table-column label="重量" align="center" prop="weight" width="100px"></el-table-column>
        <el-table-column label="价格" align="center" prop="price" width="150px"></el-table-column>
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template #default="{row}">
            <el-button :type="row.isSale==1?'primary':'success'" size="small" :icon="row.isSale==1?'Bottom':'Top'"
              @click="updateSale(row)"></el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
            <el-button type="primary" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
            <el-popconfirm :title="`你确定要删除 ${row.skuName} 吗？`" width="180px" @confirm="removeSku(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="drawer">
        <template #header>
          <h4>set title by slot1</h4>
        </template>
        <template #default>
          <el-row style="margin:20px 0">
            <el-col :span="4">名称</el-col>
            <el-col :span="20">{{skuInfo.skuName}}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="4">描述</el-col>
            <el-col :span="20" style="width:100px">{{skuInfo.skuDesc}}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="4">价格</el-col>
            <el-col :span="20">{{skuInfo.price}}</el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="4">平台属性</el-col>
            <el-col :span="20">
              <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id"
                style="margin-right:10px">{{item.valueName}}</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="4">销售属性</el-col>
            <el-col :span="20">
              <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id"
                style="margin-right:10px">{{item.saleAttrName}}:{{item.saleAttrValueName}}</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin:20px 0">
            <el-col :span="4">平台图片</el-col>
            <el-col :span="20">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="100%;height:100%">
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5,10, 15, 20]"
        :small="small" layout="prev, pager, next, jumper,->, sizes,total," :total="total" background="true"
        @size-change="handleSizeChange" @current-change="getHasSku" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  reqSkuList,
  reqCancelSaleSku,
  reqSaleSku,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku/index'
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>({})
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  } else {
  }
}

const handleSizeChange = (pageSizes: number) => {
  getHasSku()
}
const updateSale = async (row: SkuData) => {
  // 如果isSale==1则在上架状态 则要下架
  if (row.isSale == 1) {
    let result = await reqCancelSaleSku(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      getHasSku(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
  } else {
    let result1 = await reqSaleSku(row.id as number)
    if (result1.code == 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      getHasSku(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败',
      })
    }
  }
}
const updateSku = () => {
  ElMessage({
    message: '正在研发中',
  })
}
const findSku = async (row: SkuData) => {
  drawer.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  if (result.code == 200) {
    skuInfo.value = result.data
  }
}
const removeSku = async (id: number) => {
  let result = await reqRemoveSku(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
onMounted(() => {
  getHasSku()
})
</script>

<style scoped lang="scss">
.elcard {
  width: 96%;
  margin: auto;
  margin-top: 2%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
::v-deep .el-carousel__indicators--horizontal {
  position: absolute;
  bottom: 5px;
  text-align: right;
  .el-carousel__indicator--horizontal button {
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.5;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 14px;
    height: 6px;
    background: #ffffff;
    opacity: 1;
    border-radius: 10px;
  }
}
</style>