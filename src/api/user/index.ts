import request from '@/utils/request'
import type { loginForm, loginResponseData } from './type'
enum API {
  LOGIN_URL = '/user/login',
  USERINGO_URL = '/user/info'
}
// 对外暴露请求函数
// 登录
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, loginResponseData>(API.USERINGO_URL)