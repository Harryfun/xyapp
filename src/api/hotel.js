import axios from 'axios'
// 查询热门城市
export const getHot = (data) => {
  return axios.get('/posts/cities')
}
// 根据名字获取城市信息
export const getCity = (data) => {
  return axios.get('/cities', {
    params: data
  })
}
