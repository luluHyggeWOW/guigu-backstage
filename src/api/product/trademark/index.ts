import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  // 添加品牌
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  // 修改品牌
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/UPDATE",
}
// 获取已有品牌的接口方法
// page 获取第几页
// limit 获取几个
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);

// 添加或修改已有品牌
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {

  if (data.id) {
    // 修改
    return request.put<any, any>(API.UPDATETRADEMARK_URL)
  } else {
    // 新增
    return request.post<any, any>(API.ADDTRADEMARK_URL)
  }
}