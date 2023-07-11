export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface User {
  id?: number
  createTime: string,
  updateTime: string,
  username?: string,
  password?: string,
  name?: string,
  phone: null,
  roleName: string
}