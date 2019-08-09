import axios from 'axios'

// 查询城市信息
export const getCity = (data) => {
  return axios.get('/airs/city', {
    params: data
  })
}
// 查询城市信息
export const getAirList = (data) => {
  return axios.get('/airs', {
    params: data
  })
}
