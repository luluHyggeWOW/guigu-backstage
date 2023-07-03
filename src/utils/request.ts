// 进行axios的二次封装 使用请求与相应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
// 1 利用axios对象的create方法 去创建axios的实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 2 request 实例添加请求与相应拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // config配置对象 
  // 返回配置对象
  return config
})
// 3 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  let message = '';
  let status = error.response.status
  switch (status) {
    case 401:
      message = 'token过期'
      break;
    case 403:
      message = '无权访问'
      break;
    case 404:
      message = '请求地址错误'
      break;
    case 500:
      message = '服务器出现问题'
      break;
    default:
      message = '网络出现问题'
      break;
  }
  ElMessage({
    type: 'error',
    message
  })
  return Promise.reject(error)
})
export default request;
