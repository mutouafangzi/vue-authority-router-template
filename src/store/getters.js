const getters = {
  // 用户信息
  token: state => state.login.token,
  avatar: state => state.login.avatar,
  name: state => state.login.name,
  introduction: state => state.login.introduce,
  roles: state => state.login.roles,
  // 用户角色权限
  permission_routers: state => state.permissionRouter.routers,
  addRouters: state => state.permissionRouter.addRouters,
  // 左边菜单导航的折叠状态
  sidebar: state => state.sidebar.sidebar
}
export default getters
