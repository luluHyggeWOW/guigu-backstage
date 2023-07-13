export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface Permisstion {
  id?: number,
  createTime: string,
  updateTime: string,
  pid: number,
  name: string,
  code: null,
  toCode: null,
  type: number,
  status: null
  level: number,
  children?: PermisstionList,
  select: boolean
}
export type PermisstionList = Permisstion[]; //菜单接口返回的数据类型
export interface PermisstionResponseData extends ResponseData {
  data: PermisstionList
}
// 添加修改菜单ts类型
export interface MenuParams {
  id?: number,//ID
  code: string,//权限数值
  level: number,//几级菜单
  name: string,//菜单的名字
  pid: number,//菜单的ID
}