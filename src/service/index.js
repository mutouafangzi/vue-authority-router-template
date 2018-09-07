import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

const service = axios.create({
  // 所有的请求都会带上这些配置
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5 * 1000 // request timeout
})
// 请求都加上请求头
service.interceptors.request.use((config)=>{
  if (store.getters.token) {
    config.headers['X-Token'] = Cookies.get('Admin-Token')
  }
  return config
}, error=>{
  console.log('请求错误', error)
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  /* response => {
    console.log('响应对了')
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.stateCode === 200 || response.stateCode === '200') {
      return response
    } else {
      // 非200请求抱错
      console.log('状态码非200的报错')
      Message({
        message: response.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
  }, */
  error=>{
    console.log('直接报错')
    if (error.response.status === 504 || error.response.status === 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'})
    } else if (error.response.status === 403) {
      Message.error({message: '权限不足,请联系管理员!'})
    } else {
      Message.error({message: '未知错误!'})
    }
    return Promise.reject(error)
  }
)

export default service
