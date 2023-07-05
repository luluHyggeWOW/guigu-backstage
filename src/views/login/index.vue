<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" @click="login" type="primary" size="default">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getTime } from '@/utils/time'

let useStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
let loading = ref(false)
let loginForms = ref()
const login = async () => {
  loading.value = true
  await loginForms.value.validate()
  try {
    await useStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi,${getTime()}好！`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule 验证对象 value 元素文本内容 callback 函数符合条件放行 不符合注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  // rule 验证对象 value 元素文本内容 callback 函数符合条件放行 不符合注入错误提示信息
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
const rules = {
  username: [
    // { required: true, message: '用户名不能为空', trigger: 'blur' },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
</script>

<style scoped lang="scss">
body {
  padding: 0;
  margin: 0;
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login-form {
      position: relative;
      width: 80%;
      top: 30vh;
      background: url('@/assets/images/login_form.png') no-repeat;
      background-size: cover;
      padding: 40px;
      h1 {
        color: white;
        font-size: 40px;
      }
      h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0;
      }
      .login_btn {
        width: 100%;
      }
    }
  }
}
</style>