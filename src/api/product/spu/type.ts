
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
  baseSaleAttrId: number | string,
  saleAttrValueName: string,
  saleAttrName?: string,
  isChecked?: null
}
// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
// 销售属性对象ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

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
export interface Attr {
  attrId: number | string,//平台属性的ID'
  valueId: number | string,//属性值的ID
}
export interface saleAttr {
  saleAttrId: number | string,//属性ID
  saleAttrValueId: number | string,//属性
}
export interface SkuData {
  category3Id: string | number,//三级分类的ID
  spuId: string | number,//已有的SPU的ID
  tmId: string | number,//SPU品牌的ID
  skuName: string,//sku名字
  price: string | number,//sku价格
  weight: string | number,//sku重量
  skuDesc: string,//sku的描述
  skuAttrValueList?: Attr[],
  skuSaleAttrValueList?: saleAttr[],
  skuDefaultImg: string,//sku图片地址
}
// 获取sku数据接口
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
