export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string,
  updateTime?: string,
  username?: string,
  password?: string,
  name?: string,
  phone?: null,
  roleName?: string
}
// 数组包含全部的用户信息
export type Records = User[]
// 获取全部用户信息返回接口的ts类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    pages: number
  }
}
// 一个职位的ts类型
export interface RoleData {
  id?: number,
  createTime?: string,
  updateTime?: string,
  roleName: string,
  remark: null
}
// 全部职位列表
export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole,
    allRolesList: AllRole
  }
}
// 给用户分配角色携带的ts类型
export interface SetRoleData {
  roleIdList: number[],
  userId: number
}