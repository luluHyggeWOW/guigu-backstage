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
      <el-select v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length? `还未选择${unSelectSaleAttr.length}个`:'无'">
        <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :key="item.id"
          :label="item.name"></el-option>
      </el-select>
      <el-button @click="addSaleAttr" :disabled="!saleAttrIdAndValueName" type="primary" icon="Plus"
        style="margin-left:10px;">添加属性值</el-button>
      <el-table border style="margin:10px 0;" :data="saleAttr">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column label="销售属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #default={row}>
            <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="index" class="mx-1" closable
              @close="row.spuSaleAttrValueList.splice(index,1)">
              {{item.saleAttrValueName}}
            </el-tag>
            <el-input @blur="toLook(row)" v-if="row.flag==true" v-model="row.saleAttrValue" type="primary" size="small"
              placeholder="请输入属性值" style="width:100px"></el-input>
            <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="Plus"></el-button>
          </template>
        </el-table-column>
        <el-table-column label=" 操作" width="150px">
          <template #default={$index}>
            <el-button type="primary" size="small" @click="saleAttr.splice($index,1)" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save" :disable="saleAttr.length>0?false:true">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { SpuData } from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllAsleAttr,
  reqAddOrUpdateSpu,
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
  SaleAttrValue,
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
  $emit('changeScene', { flag: 0, parmas: '' })
}
// 子组件书写一个方法
const initHasSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
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
// 计算出当前spu未选择的属性
const unSelectSaleAttr = computed(() => {
  // 全部销售属性最多有三个
  let unSelectAttr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectAttr
})
// 将来收集还未选择销售属性的id和name
let saleAttrIdAndValueName = ref<string>('')
const addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数组当中
  saleAttr.value.push(newSaleAttr)
  // 清空手机数据
  saleAttrIdAndValueName.value = ''
}
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
  let { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值名不能为空',
    })
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item: any) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值名不能重复',
    })
    return
  }

  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值名不能为空',
    })
    return
  }
  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}
const save = async () => {
  // 照片墙
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 整理销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  let result: any = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    // 更新成功通知父组件切换场景为0
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}
// 添加一个新的spu初始化方法
const initAddSpu = async (c3Id: number | string) => {
  Object.assign(SpuParams.value, {
    category3Id: '',
    description: '',
    spuName: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = '  '
  SpuParams.value.category3Id = c3Id
  let result: AllTradeMark = await reqAllTradeMark()
  let result1: HasSaleAttrResponseData = await reqAllAsleAttr()
  AllTradeMark.value = result.data
  allSaleAttr.value = result1.data
}
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss">
</style>