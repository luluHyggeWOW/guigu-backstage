import request from '@/utils/request'
import type { loginFormData, loginResponseData, userInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINGO_URL = '/admin/acl/index/info'
}
// 对外暴露请求函数
// 登录
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINGO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.USERINGO_URL)