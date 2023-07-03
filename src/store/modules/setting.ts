// 关于layout组件相关配置仓库
import { defineStore } from "pinia";
let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false,
      refsh: false,//刷新
    }
  },
})
export default useLayOutSettingStore