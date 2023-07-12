<template>
  <div>
    <el-card class="elcard" style="height:80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyword" @click="search">搜索</el-button>
          <el-button @click="resst">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="elcard">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button :disabled="!selectIdArr.length" @click="deleteSelectUser">批量删除</el-button>
      <el-table @selection-change="selectChange" border :data="userArr" style="margin-top:10px">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" width="80px" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名" align="center" prop="username" width="150px"
          show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" align="center" width="150px" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户职位" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="200px"></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime" width="200px"></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #default={row,$index}>
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>

            <el-popconfirm :title="`你确定要删除 ${row.username} 吗？`" width="240px" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination v-model:current-page="pageNo" :background="true" :page-sizes="[10,15,20,25]"
        v-model:page-size="limit" :prev-icon="9" layout="prev, pager, next, jumper,->,total, sizes" :total="total"
        @current-change="getHasUser" @size-change="changeSize">
      </el-pagination>
    </el-card>
    <!-- 抽屉 添加修改用户 -->
    <el-drawer v-model="drawer" direction="rtl" size="25%" :before-close="drawerclose">
      <template #header="{ titleClass }">
        <h4 :class="titleClass"> {{userParams.id?'更新用户':'添加用户'}}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-drawer>
    <!-- 抽屉 分配角色 -->
    <el-drawer v-model="drawer1" title="I'm outer Drawer" size="25%">
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
            @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in allRole" :key="index" :label="item">{{
      item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel1">取消</el-button>
        <el-button type="primary" @click="save1">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, reactive, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user/index'
import type {
  Records,
  UserResponseData,
  User,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import { useRoute } from 'node_modules/vue-router/dist/vue-router'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
// 用户总个数
let total = ref<number>(0)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
let formRef = ref<any>()
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
// 收集用户信息响应数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
let selectIdArr = ref<User[]>([])
let keyword = ref<string>('')
let settingStore = useLayOutSettingStore()
// 获取已有的用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
const changeSize = () => {
  getHasUser()
}
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const updateUser = (row: User) => {
  drawer.value = true
  userParams.username = row.username
  userParams.name = row.name
  userParams.id = row.id
}
const save = async () => {
  // 表单要符合
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    drawer.value = false

    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功',
    })
    // getHasUser(userParams.id ? pageNo.value : 1)
    // 浏览器自动刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败',
    })
  }
}
const cancel = () => {
  drawer.value = false
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  })
}
const validateUsername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名至少为5位'))
  }
}
const validateName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少为5位'))
  }
}
const validatePassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少为6位'))
  }
}
const rules = {
  password: [{ validator: validatePassword, trigger: 'blur', requird: true }],
  username: [{ validator: validateUsername, trigger: 'blur', requird: true }],
  name: [{ validator: validateName, trigger: 'blur', requird: true }],
}
const drawerclose = (done: () => void) => {
  Object.assign(userParams, {
    id: '',
    username: '',
    name: '',
    password: '',
  })
  done()
}
const setRole = async (row: User) => {
  Object.assign(userParams, row)
  let result = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer1.value = true
  }
}
// 全选
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string) => {
  let checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
}
const save1 = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    }),
  }
  let result = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配职位成功',
    })
    drawer1.value = false
    getHasUser()
  } else {
    ElMessage({
      type: 'error',
      message: '分配职位失败',
    })
  }
}
const cancel1 = () => {}
const deleteUser = async (userId: number) => {
  let result = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// table复选框勾选触发
const selectChange = (value: any) => {
  selectIdArr.value = value
}
const deleteSelectUser = async () => {
  let idsList: any = selectIdArr.value.map((item) => {
    return item.id
  })
  let result = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    })
  }
}
const search = () => {
  getHasUser()
  // 清空关键字
  keyword.value = ''
}
const resst = () => {
  settingStore.refsh = !settingStore.refsh
}
onMounted(() => {
  getHasUser()
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