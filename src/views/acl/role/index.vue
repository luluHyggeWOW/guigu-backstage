<template>
  <div>
    <el-card class="elcard" style="height:80px">
      <el-form :inline="true" class="form">
        <el-form-item label="职位名：">
          <el-input placeholder="请输入职位名称" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyword" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="elcard">
      <el-button type="primary" @click="addRole">添加职位</el-button>
      <el-table @selection-change="selectChange" border :data="allRole" style="margin-top:10px">
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" width="150px" align="center" prop="id"></el-table-column>
        <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default={row}>
            <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>

            <el-popconfirm :title="`你确定要删除 ${row.roleName} 吗？`" width="240px" @confirm="deleteRole(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination v-model:current-page="pageNo" :background="true" :page-sizes="[10,15,20,25]"
        v-model:page-size="limit" :prev-icon="9" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getHasRole" @size-change="changeSize">
      </el-pagination>
    </el-card>

    <!-- 抽屉 分配职位与权限 -->
    <el-drawer v-model="drawer" title="I'm outer Drawer" size="25%">
      <template #default>
        <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" :default-checked-keys="selectArr"
          :props="defaultProps" default-expand-all />
      </template>
      <template #footer>
        <el-button @click="cancel1">取消</el-button>
        <el-button type="primary" @click="save1">确定</el-button>
      </template>
    </el-drawer>
    <el-dialog v-model="dialogVisite" :title="RoleParams.id?'更新职位':'添加职位'">
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="RoleParams.roleName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, reactive, nextTick } from 'vue'
import {
  reqAddOrUpdateRole,
  reqAllRoleList,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from '@/api/acl/role/index'
import {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
import useLayOutSettingStore from '@/store/modules/setting'
import { fa } from 'element-plus/es/locale'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let keyword = ref<string>('')
let allRole = ref<Records>([])
let total = ref<number>(0)
let settingStore = useLayOutSettingStore()
let dialogVisite = ref<boolean>(false)
let RoleParams = reactive<RoleData>({
  roleName: '',
})
let form = ref<any>()
let drawer = ref<boolean>(false)
const defaultProps = {
  children: 'children',
  label: 'name',
}

let menuArr = ref<MenuList>([])
let selectArr = ref<number[]>([])
let tree = ref<any>()
// 用户总个数
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
const changeSize = () => {
  getHasRole()
}
const search = () => {
  getHasRole()
  keyword.value = ''
}
const reset = () => {
  settingStore.refsh = !settingStore.refsh
}
const addRole = () => {
  dialogVisite.value = true
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
const updateRole = (row: RoleData) => {
  dialogVisite.value = true
  Object.assign(RoleParams, row)
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('长度最少两位'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
const save = async () => {
  await form.value.validate()
  dialogVisite.value = false
  let result: any = await reqAddOrUpdateRole(RoleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    })
    getHasRole(RoleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: RoleParams.id ? '更新失败' : '添加失败',
    })
  }
}
const cancel = () => {
  dialogVisite.value = false
}
const setPermisstion = async (row: RoleData) => {
  drawer.value = true
  Object.assign(RoleParams, row)
  let result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
const filterSelectArr = (allDate: any, initArr: any) => {
  allDate.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
const save1 = async () => {
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let permisstionId = arr.concat(arr1)
  let result: any = await reqSetPermisstion(
    RoleParams.id as number,
    permisstionId,
  )
  if (result.code == 200) {
    drawer.value = false
    ElMessage({ type: 'success', message: '分配权限成功' })
    window.location.reload()
  } else {
    ElMessage({ type: 'error', message: '分配权限失败' })
  }
}

const deleteRole = async (roleId: number) => {
  let result: any = await reqRemoveRole(roleId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'error', message: '' })
  }
}
onMounted(() => {
  getHasRole()
})
</script>

<style scoped lang="scss">
.elcard {
  width: 96%;
  margin: auto;
  margin-top: 2%;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>