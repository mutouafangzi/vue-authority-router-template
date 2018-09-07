import request from '@/service/index.js'

export function loginByUserInfo(username, pwd) {
  const data = {
    username,
    pwd
  }
  console.log('请求了', data)
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {token}
  })
}

/* export const loginByUserInfo = [{
    'id': 1,
    'username': 'admin',
    'pew': 123456,
    'role': ['admin'],
    'introduce': '我是admin'
  },
  {
    'id': 2,
    'username': 'user',
    'pew': 123456,
    'role': ['user'],
    'introduce': '我是user'
  },
  {
    'id': 3,
    'username': 'editer',
    'pew': 123456,
    'role': ['editer'],
    'introduce': '我是editer'
  }
]
 */
