import Vue from 'vue'
import Router from 'vue-router'

// import Login from '@/views/login'
// import Errorpage from '@/views/404.vue'
import layout from '@/views/layout/layout.vue'

Vue.use(Router)

// 初始化路由，都需要有的
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1，默认是false
    hidden: true,
    component: (resolve) => require(['../views/login.vue'], resolve)
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: (resolve) => require(['../views/errorPages/404.vue'], resolve)
  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: (resolve) => require(['../views/errorPages/401.vue'], resolve)
  },
  {
    path: '',
    component: layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['../views/dashboard/index.vue'], resolve),
        // name: '首页',
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/documentation',
    component: layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: () => import('@/views/documentation/index'),
      name: '文档',
      meta: {
        // 设置该路由在侧边栏和面包屑中展示的名字
        title: '文档',
        // 设置该路由的图标
        icon: 'documentation'
        // 如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
        // noCache: true
      }
    }]
  },
  {
    path: '/guide',
    component: layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: '引导',
      meta: {
        // 设置该路由在侧边栏和面包屑中展示的名字
        title: '引导',
        // 设置该路由的图标
        icon: 'guide'
        // 如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
        // noCache: true
      }
    }]
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
    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面;只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面;若你想不管路由下面的 children 声明的个数都显示你的根路由,你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow: true,
    meta: {
      title: '权限',
      icon: 'lock'
    },
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
    path: '/error',
    component: layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '404',
        name: '404',
        component: ()=>import('@/views/errorPages/404.vue'),
        meta: {
          title: '404'
        }
      },
      {
        path: '401',
        name: '401',
        component: ()=>import('@/views/errorPages/401.vue'),
        meta: {
          title: '401'
        }
      }
    ]
  },
  {
    path: '/graphic',
    name: '组件',
    redirect: 'noredirect',
    component: layout,
    alwaysShow: true,
    meta: {
      title: '组件'
    },
    children: [
      {
        path: '3DInstagram',
        component: () => import('@/views/graphic/3DInstagram'),
        name: '3D照片墙',
        meta: {
          title: '3D照片墙',
          icon: '3D'
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
