<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="(item) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" style="width:30%;">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height:100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="">1</el-option>
        <el-option label="">2</el-option>
      </el-select>
      <el-button type="primary" icon="Plus" style="margin-left:10px;">添加属性值</el-button>
      <el-table border style="margin:10px 0;" :data="saleAttr">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column label="销售属性名" :prop="saleAttrName" width="150px"></el-table-column>
        <el-table-column label="销售属性值">
          <template #default={row}>
            <el-tag v-for="{item,index} in row.spuSaleAttrValueList" :key="index" class="mx-1" closable
              :type="item.type">
              {{item.saleAttrValueName}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default={$index}>
            <el-button type="" size="small" @click="saleAttr.splice($index,1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { SpuData } from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllAsleAttr,
} from '@/api/product/spu/index'
import type {
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  TradeMark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScene'])
let AllTradeMark = ref<TradeMark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttr = ref<SaleAttr[]>([])
let allSaleAttr = ref<HasSaleAttr[]>([])
let SpuParams = ref<SpuData>({
  category3Id: '',
  description: '',
  spuName: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref()
const cancel = () => {
  $emit('changeScene', 0)
}
// 子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  console.log(SpuParams.value)
  // spu 为父组件传递过来的已有的SPU对象[不完整]
  // 获取全部品牌数据
  let result: AllTradeMark = await reqAllTradeMark()
  // 获取某个品牌旗下全部售卖商品的照片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取挣项目全部SPU销售属性
  let result3: HasSaleAttrResponseData = await reqAllAsleAttr()
  AllTradeMark.value = result.data
  imgList.value = result1.data
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
  imgList.value = result1.data.map((item: any) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}
// 照片墙预览
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const handleRemove = () => {}
const beforeUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传图片小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传图片格式不符',
    })
    return false
  }
}
const save = () => {}
defineExpose({ initHasSpuData })
</script>

<style scoped lang="scss">
</style>