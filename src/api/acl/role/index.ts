import request from "@/utils/request"
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
enum API {
  ALLROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",//更新已有的职位
  UPDATEROLE_URL = "/admin/acl/role/update",
  ALLPERMISSTION_URL = "/admin/acl/permission/toAssign/",
  SETPERMISTION_URL = "/admin/acl/permission/doAssign/",
  REMOVEROLE_URL = "/admin/acl/role/remove/"

}
export const reqAllRoleList = (page: number, limit: number, rolename: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${rolename}`)
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roleId)
export const reqSetPermisstion = (roleId: number, permisstionId: number[]) => request.get<any, MenuResponseData>(API.SETPERMISTION_URL + `?roleId=${roleId}&permisstionId=${permisstionId}`)
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)