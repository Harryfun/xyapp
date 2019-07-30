import axios from 'axios'
// 获取验证码
export const getCode = data => {
  return axios.post('captchas', data)
}
