<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline="true">
          <el-form-item v-for="(item) in attrArr" :key="item.id" :label="item.attrName" label-width="100px">
            <el-select v-model="item.attrIdAndValueId">
              <el-option :value="`${item.id}:${item1.id}`" v-for="item1 in item.attrValueList" :key="item1.id"
                :label="item1.valueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline="true">
          <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId">
              <el-option :value="`${item.id}:${item1.id}`" v-for="item1 in item.spuSaleAttrValueList" :key="item1.id"
                :label="item1.saleAttrValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection" align="center" width="100px"></el-table-column>
          <el-table-column label="图片">
            <template #default={row}>
              <img :src="row.imgUrl" alt="" style="max- width:100px;max-height:150px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #default={row}>
              <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr/index'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu/index'
import { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
let skuParams = reactive<SkuData>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [
    //平台属性的收集
    {
      attrId: '', //平台属性的ID'
      valueId: '', //属性值的ID
    },
  ],
  skuSaleAttrValueList: [
    //销售属性\
    {
      saleAttrId: '', //属性ID
      saleAttrValueId: '', //属性
    },
  ],
  skuDefaultImg: '', //sku图片地址
})
let table = ref<any>()
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  // 获取平台属性
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  // 获取销售属性
  let result1: any = await reqSpuHasSaleAttr(spu.id)
  // 获取照片墙
  let result2: any = await reqSpuImageList(spu.id)
  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}
const handler = (row: any) => {
  imgArr.value.forEach((e: any) => {
    table.value.toggleRowSelection(e, false)
  })
  table.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}
const save = async () => {
  // 整理参数
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )
  let result: any = await reqAddSku(skuParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    })
  }
}
// 自定义事件
let $emit = defineEmits(['changeScene'])
// 对外暴露
defineExpose({ initSkuData })
</script>

<style scoped lang="scss">
</style>