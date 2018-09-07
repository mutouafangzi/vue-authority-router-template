import { loginByUserInfo, getUserInfo } from '@/api/login'
import Cookies from 'js-cookie'
const login = {
  state: {
    token: Cookies.get('Admin-Token'),
    name: '',
    avatar: '',
    roles: [],
    introduce: ''
  },
  mutations: {
    // 设置token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    // 设置名字
    SET_NAME: (state, name) => {
      state.name = name
    },
    // 设置名字
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // 保存角色
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // 设置相关描述
    SET_INTRODUCE: (state, introduce) => {
      state.introduce = introduce
    }
  },
  actions: {
    // 登录操作
    LoginIn({ commit }, userInfo) {
      // let data = {}
      // 处理下用户名的空格
      const username = userInfo.username.trim()
      return new Promise((resolve, reject)=>{
        loginByUserInfo(username, userInfo.password).then(response=>{
          // 返回数据中有很多信息，头像，介绍，名字,角色信息，以及token
          // console.log('用户名登陆后返回token', response.data.token)
          const data = response.data
          commit('SET_TOKEN', data.token)
          // 登录成功后将token存储在cookie之中
          Cookies.set('Admin-Token', data.token)
          resolve(data)
        }).catch(error=>{
          reject(error)
        })
      })
    },
    // 根据登录成功的token再次请求后台，获取对应的用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) {
            reject('返回error')
          }
          // console.log('返回的y用户信息的数据', response)
          const data = response.data
          // 设置用户名，头像，简介
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCE', data.introduction)
          // 设置角色
          if (data.roles && data.roles.length > 0) {
            // 角色有可能是空数组,不是空的话设置
            commit('SET_ROLES', data.roles)
          } else {
            reject('用户角色忘记设置了吧，不能为空的')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default login
