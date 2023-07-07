// 书写属性相关的API的文件
import request from "@/utils/request"
import type { HasSpuResponseData } from './type'
enum API {
  HASSPU_URL = "/admin/product/",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
  ADDORUPDATE_URL = "/admin/product/saveAttrInfo",
  DELETEATTR_URL = "/admin/product/deleteAttr/"
}
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
