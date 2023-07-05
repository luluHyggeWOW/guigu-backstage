// 登录接口需要携带参数ts类型

export interface loginFormData {
  username: string,
  password: string
}
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
interface dataType {
  token?: string,
  message?: string
}
// 登录 返回数据的类型
export interface loginResponseData extends ResponseData {
  data: string,
}
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
interface user {
  checkUser: {}
}
// 定义服务器返回用户信息相关的数据类型
export interface userResponseData {
  code: number,
  data: user
}