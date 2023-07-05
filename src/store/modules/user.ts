// 用户相关的小仓库
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'
// 引入数据类型
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: ''
    }
  },
  actions: {
    // 用户登录
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = (result.data as string)
        // 本地持久化存储token
        SET_TOKEN((result.data as string))
        return 'ok'
      } else if (result.code === 201) {
        return Promise.reject(new Error(result.data))
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        return 'ok';
      } else {
        console.log(111, result.message);
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      let result: any = await reqLogout();
      if (result.code == 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }

    }
  },
  getters: {

  }
})
export default useUserStore;