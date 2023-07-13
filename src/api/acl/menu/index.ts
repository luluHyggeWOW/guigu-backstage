import request from "@/utils/request"
import type { PermisstionResponseData, MenuParams } from './type'
enum API {
  ALLPERMISSTION_URL = "/admin/acl/permission",
  ADDMENU_URL = "/admin/acl/permission/save",//更新某一个己有的菜单
  UPDATEMENU_URL = "/admin/acl/permission/update",
  DELETEMENU_URL = "/admin/acl/permission/remove/"
}

export const reqAllPermission = () => request.get<any, PermisstionResponseData>(API.ALLPERMISSTION_URL)
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data)
  } else {
    return request.put<any, any>(API.ADDMENU_URL, data)
  }
}
export const reqRemoveMenu = (id: number) => request.get<any, any>(API.DELETEMENU_URL + id)

