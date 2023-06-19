// 常量路由
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routers";
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router;