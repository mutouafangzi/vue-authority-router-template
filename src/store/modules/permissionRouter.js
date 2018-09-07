import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 根据角色筛选路由
 * @param asyncRouterMap 未筛选过的路由
 * @param roles  用户的角色
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route=> {
    if (route.meta.roles.indexOf('admin')) {return true}
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length > 0) {
        route.children = route.children.filter(child => {
          if (hasPermission(roles, child)) {return child}
          return false
        })
        return route
      } else {
        return route
      }
    }
    return false
  })
  return accessedRouters
}
/**
 * 判断当前角色是否和路由权限角色相配
 * @param router 当前的路由，一般是一个对象
 * @param roles  用户的角色
 */
function hasPermission(roles, router) {
  if (router.meta && router.meta.roles) {
    return roles.some(role => router.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permissionRouter = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    // 产生过滤后的路由地址
    SET_ROUTERS: (state, routers)=> {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      // console.log('----', state.addRouters, state.routers)
    }
  },
  actions: {
    // 产生新的路由
    GenerateRoutes({commit}, data) {
      // console.log('触发了产生新的路由')
      return new Promise(resolve => {
        const {roles} = data
        // 定义新的路由
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log('筛选后的路由', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permissionRouter
