import { createApp, useAttrs } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import router from "./router";
// 引入模板的全局的样式
import '@/styles/index.scss'
// 引入pinia仓库
import pinia from "./store";
// 获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
// 引入自定义插件对象：注册整合过项目全剧组件
import gloalComponent from '@/components'
// 安装自定义插件
app.use(gloalComponent)
app.use(pinia)
// 注册模板路由
app.use(router)
// 引入路由鉴权文件
import './permisstion'
// 将应用挂在到挂在点上
app.mount('#app')
