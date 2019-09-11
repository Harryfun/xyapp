import axios from 'axios'
// 获取验证码
export const getCode = data => {
  return axios.post('captchas', data)
}
// 用户注册
export const register = (data, headers) => {
  // header = {
  //   'headers': {
  //     Authorization: `Bearer ${JSON.parse(localStorage.userToken)}`
  //   }
  // }
  return axios.post('accounts/register', data)
}
// 用户注册
export const login = data => {
  return axios.post('accounts/login', data)
}
export const getGitUrl = () => {
  return axios.get('accounts/gitUrl')
}
export const gitReg = (data) => {
  return axios.post('accounts/gitReg', data)
}
