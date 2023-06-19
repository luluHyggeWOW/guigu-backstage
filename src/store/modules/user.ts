// 用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin } from '@/api/user';
// 引入数据类型
import type { loginForm, loginResponseData } from 'src/api/user/type';
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN()
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = (result.data.token as string)
        // 本地持久化存储token
        SET_TOKEN((result.data.token as string))
        return 'ok'
      } else if (result.code === 201) {
        return Promise.reject(new Error(result.data.message))
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    }
  },
  getters: {

  }
})
export default useUserStore;