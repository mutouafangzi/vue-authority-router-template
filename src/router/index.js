import Vue from 'vue'
import Router from 'vue-router'

// import Login from '@/views/login'
// import Errorpage from '@/views/404.vue'
import layout from '@/views/layout/layout.vue'
// import indexPage from '@/views/layout/indexpage.vue'
// import watchPage from '@/views/layout/watch.vue'
// import editPage from '@/views/layout/edit.vue'
// import deletePage from '@/views/layout/delete.vue'
// import addPage from '@/views/layout/add.vue'

Vue.use(Router)

// 初始化路由，都需要有的
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: (resolve) => require(['../views/login.vue'], resolve)
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: (resolve) => require(['../views/404.vue'], resolve)
  },
  {
    path: '/test',
    name: 'test',
    hidden: true,
    component: (resolve) => require(['../views/test.vue'], resolve)
  },
  {
    path: '',
    name: '首页',
    hidden: true,
    component: layout,
    redirect: '/dashboard',
    meta: { title: '首页' },
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['../views/dashboard/index.vue'], resolve),
        name: '首页',
        meta: { title: '首页' }
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由，需要判定的，meta定义了role
export const asyncRouterMap = [
  {
    path: '/permission',
    name: 'permission',
    redirect: '/permission/watch',
    component: layout,
    hidden: false,
    children: [
      {
        path: 'watch',
        name: 'watch',
        component: (resolve) => require(['../views/watch'], resolve),
        meta: {
          title: 'watch',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'edit',
        name: 'edit',
        component: (resolve) => require(['../views/edit'], resolve),
        meta: {
          title: 'edit',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'delete',
        name: 'delete',
        component: (resolve) => require(['../views/delete'], resolve),
        meta: {
          title: 'delete',
          roles: ['admin']
        }
      },
      {
        path: 'add',
        name: 'add',
        component: (resolve) => require(['../views/add'], resolve),
        meta: {
          title: 'add',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
