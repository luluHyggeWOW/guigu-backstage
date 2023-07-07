<template>
  <div>
    <Category :scene=scene></Category>
    <el-card class="elcard">
      <div v-show="scene==0">
        <el-button @click="addAttr" type="primary" size="default" icon="Plus"
          :disabled="!categoryStore.c3Id">添加属性</el-button>
        <el-table border style="margin:10px 0px;" :data="categoryStore.attrArr">
          <el-table-column label="序号" type="index" align="center" width="150px"></el-table-column>
          <el-table-column label="属性名称" prop="attrName" align="center" type="" width="200px"></el-table-column>
          <el-table-column label="属性值名称" align="center" type="">
            <template #default="{row}">
              <el-tag v-for="(item) in row.attrValueList
" :key="item.id" style="margin:3px;">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" type="" width="200px">
            <template #default="{row}">
              <el-button @click=" updateAttr(row)" type="" size="small" icon="Edit"></el-button>
              <el-popconfirm :title='`确定要删除${row.attrName}?`' @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene==1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addAttrValue" :disabled="attrParams.attrName?false:true"
          icon="Plus">添加属性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table border style="margin:10px 0;" :data="attrParams.attrValueList">
          <el-table-column width="100px" align="center" type="index"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{row,$index}">
              <el-input v-if="row.flag" size="small" @blur="toLook(row,$index)" placeholder="请输入属性值名称" style="width:80%"
                :ref="(vc:any)=>{inputArr[$index]=vc}" v-model="row.valueName"></el-input>
              <div v-else @click="toEdit(row,$index)">{{row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="200px">
            <template #default="{$index}">
              <el-button @click="attrParams.attrValueList.splice($index,1)" type="primary" icon="Delete"
                size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import type { Attr, AttrValue } from '@/api/product/attr/type'
import {
  reqAddOrUpdateAttr,
  reqAttr,
  reqRemoveAttr,
} from '@/api/product/attr/index'
import { ElMessage } from 'element-plus'
import { getActivePinia } from 'pinia'
let categoryStore = useCategoryStore()
let scene = ref(0)
const inputArr = ref([])
let attrParams = reactive<Attr>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})
let addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
    attrValueList: [],
  })
  scene.value = 1
}
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  // Object.assign(attrParams, structuredClone(row))
}
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    handler2()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const handler2 = async () => {
  let result = await reqAttr(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    categoryStore.attrArr = result.data
  }
}
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  console.log(result)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    handler2()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  nextTick(() => {
    console.log(inputArr.value)
    inputArr.value[$index].focus()
  })
}
onBeforeUnmount(() => {
  // 清空仓库数据
  categoryStore.$reset()
})
</script>

<style scoped lang='scss'>
.el-card {
  width: 96%;
  margin: auto;
  margin-top: 2%;
}
</style>