<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark()">添加品牌</el-button>
      <!-- 表格组件 展示已有 -->
      <el-table :data="trademarkArr" style="width: 100%;margin-top:1%" border>
        <el-table-column prop="index" label="序号" width="100%" align="center" type="index"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称" width="400px"></el-table-column>
        <el-table-column label="品牌Logo">
          <template #=" {row,$index}">
            <div style="width:100px;height:100px">
              <img :src="row.logoUrl" alt="" style="width:100px;max-height:100px;min-height:30px">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="Edit" @click="updataTrademark(row)"></el-button>
            <el-popconfirm width="250" confirm-button-text="OK" cancel-button-text="No, Thanks" :icon="Delete"
              icon-color="red" :title="`确定要删除${row.tmName}?`" @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" @click="deleteTrademark(row)"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" v-model:current-page="pageNo"
        :background="true" :page-sizes="[5,10,15,20]" v-model:page-size="limit" :prev-icon="9"
        layout="prev, pager, next, jumper,->,total, sizes" :total="total">
      </el-pagination>
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog :title="trademarkParams.id?'修改品牌':'添加品牌'" v-model="dialogFormVisible">
      <el-form style="width:80%" :model="trademarkParams" ref="formRef" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input autocomplete="off" placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon">+</i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
let pageNo = ref<number>(1)
let limit = ref<number>(5)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
let formRef = ref()
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
const sizeChange = () => {
  getHasTrademark()
}
// 上传图片之前触发
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件应小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传格式PNG|JPG|GIF',
    })
    return false
  }
}
// 上传图片成功触发
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate('logoURL')
}
const addTrademark = () => {
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = !dialogFormVisible.value
  formRef.value?.clearValidate(['logoUrl', 'tmName'])
}
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTradeMark(trademarkParams)
  console.log(result)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
}
const updataTrademark = (row: TradeMark) => {
  dialogFormVisible.value = true
  trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
  formRef.value?.clearValidate(['logoUrl', 'tmName'])
}
const deleteTrademark = () => {}

const validatorTmName = (rule: any, value: any, callback: any) => {
  console.log(11111, rule, value)
  if (value.trim().length > 2) {
    return callback()
  } else {
    return callback(new Error('品牌名称应大于两位'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    return callback()
  } else {
    return callback(new Error('请上传图片'))
  }
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: 'validatorTmName' }],
  logoUrl: [{ required: true, validator: 'validatorLogoUrl' }],
}
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
onMounted(async () => {
  await getHasTrademark()
})
</script>

<style scoped lang="scss">
// .box-card {
//   width: 96%;
//   margin: auto;
//   margin-top: 2%;
// }
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>