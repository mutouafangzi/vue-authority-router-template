import store from './store'
import router from './router'

// import { Message } from 'element-ui'
const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  // console.log('触发了导航守卫', to.matched, to, from, store)
  if (store.getters.token) { // 判断是否有token
    // console.log('获取到了token')
    // 已经有token，说明登陆成功
    if (to.path === '/login') {
      // 说明此时是要去登录页面
      next('/')
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已经获取用户相关信息
        // console.log('获取到了用户信息')
        // 还未获得用户信息
        store.dispatch('GetUserInfo').then(res=>{ // 获取用户信息
          // console.log('触发获取用户请求')
          const roles = res.data.roles
          store.dispatch('GenerateRoutes', { roles }).then(()=>{// 生成可访问的路由表
            console.log('返回的新产生的路由', store.getters.addRouters, store.getters.permission_routers)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({...to, replace: true})
          })
        }).catch(err=>{
          console.log(err)
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    // console.log('没有获取到token')
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中
      next()
    } else {
      // 否则全部重定向到登录页
      next('/login')
    }
  }
})
