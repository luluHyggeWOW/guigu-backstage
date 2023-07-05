// 路由鉴权 项目当中能不能被访问的权限
import router from '@/router';
import nprogress from 'nprogress';
import setting from './setting';
// 进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false });
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + '-' + to.meta.title;
  // 访问路由之前的守卫
  nprogress.start();
  // 获取token 判断用户是否登录
  let token = userStore.token
  let username = userStore.username;
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo()
          next();
        } catch (error) {
          // token过期 或者修改了token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }

  }
})

// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done();
})
// 路由器切换 首页、登录 、任意路由、404、数据大屏、权限管理、商品管理

// 用户未登录 可访问login 其他不能访问
// 用户登录 不可以访问login 其余的可以访问


