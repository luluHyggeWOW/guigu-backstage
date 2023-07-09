
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface SpuData {
  id?: number | string,
  spuName: string,
  tmId: number | string,
  description: string,
  category3Id: string | number,
  spuSaleAttrList: null | SaleAttr[],
  spuImageList: null | SpuImg[]
}
export type Records = SpuData[]
// 响应分类接口返回数据的类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}
export interface TradeMark {
  id?: number,
  tmName: string,
  logoUrl: string,
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}
// 商品牌图片ts类型
export interface SpuImg {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  imgName?: string,
  imgUrl?: string,
  name?: string,
  url?: string,

}
// 已有spu照片墙数据类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
// 已有的销售属性值ts类型
export interface SaleAttrValue {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  baseSaleAttrId: number,
  saleAttrValueName: string,
  saleAttrName?: string,
  isChecked?: null
}
// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
// 销售属性对象ts类型
export interface SaleAttr {
  id?: number,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  baseSaleAttrId?: string,
  saleAttrName: string,
  spuSaleAttrValueList?: SpuSaleAttrValueList
}
// SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
// 已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
  id: number,
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}