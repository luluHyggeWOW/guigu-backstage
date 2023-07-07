
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const allGloablComponent: any = { SvgIcon, Category }

//对外暴露插件对象
export default {
  // 务必叫做install方法
  install(app: any) {
    // 注册项目全部的全剧组件
    Object.keys(allGloablComponent).forEach(key => {
      //注册为全剧组件
      app.component(key, allGloablComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}