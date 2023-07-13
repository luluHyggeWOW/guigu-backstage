<template>
  <div>
    <el-table border :data="PermisstionArr" class="elcard" row-key="id">
      <el-table-column label="名称" align="center" prop="name"></el-table-column>
      <el-table-column label="权限值" align="center" prop="code" show-overflow-tooltip></el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default={row}>
          <el-button :type="row.level==1?'primary': row.level==2?'success':row.level==3?'info':''" size="small"
            icon="Plus" :disabled="row.level==4" @click="addPermission(row)">添加{{row.level==3?'功能':'菜单'}}</el-button>
          <el-button :type="row.level==1?'primary': row.level==2?'success':row.level==3?'info':''" size="small"
            icon="Edit" @click="updatePermission(row)" :disabled="row.level==1">编辑</el-button>
          <el-popconfirm :title="`你确定要删除 ${row.name} 吗？`" width="240px" @confirm="deletePermission(row.id)">
            <template #reference>
              <el-button :type="row.level==1?'primary': row.level==2?'success':row.level==3?'info':''" size="small"
                icon="Delete" :disabled="row.level==1">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" :title="menuData.id?'更新菜单':'添加菜单'">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="menuData.name" />
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="menuData.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/menu/index'
import {
  PermisstionResponseData,
  PermisstionList,
  MenuParams,
  Permisstion,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
let PermisstionArr = ref<PermisstionList>([])
let dialogFormVisible = ref<boolean>(false)
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermission()
  if (result.code == 200) {
    PermisstionArr.value = result.data
  }
}
const addPermission = async (row: Permisstion) => {
  Object.assign(menuData, {
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogFormVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
}
const updatePermission = async (row: Permisstion) => {
  dialogFormVisible.value = true
  Object.assign(menuData, row)
}
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    dialogFormVisible.value = false
    getHasPermisstion()
  } else {
    ElMessage({ type: 'error', message: menuData.id ? '更新失败' : '添加失败' })
  }
}
const deletePermission = async (id: number) => {
  let result: any = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
onMounted(() => {
  getHasPermisstion()
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