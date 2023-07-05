import request from '@/utils/request'
import type { TradeMarkResponseData } from './type'
enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = "/admin/product/baseTrademark/"
}
// 获取已有品牌的接口方法
// page 获取第几页
// limit 获取几个
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);
