import request from "@/utils/request"
import type { User } from './type'
enum API {
  ALLUSER_URL = "/admin/acl/user/",

}
export const reqUserInfo = (page: number, limit: number) => request.get<any, any>(API.ALLUSER_URL + `${page}/${limit}`)
