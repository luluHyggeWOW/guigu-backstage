
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
export interface Spudata {
  id?: number | string,
  spuName: string,
  description: string,
  category3Id: string | number,
  tmId: number,
  spuSaleAttrList: null,
  spuImageList: null
}
export type Records = Spudata[]
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
// 属性值对象的ts类型
export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number,
  flag?: boolean
}
// 存储每一个属性值的数组对象
export type AttrValueList = AttrValue[];
// 属性对象
export interface Attr {
  id?: number,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: AttrValueList
}
//存储每一个属性对象的数组ts类型
export type AttrList = Attr[];
// 属性接口返回的数据ts类型
export interface AttrResponseData extends ResponseData {
  data: []
}


