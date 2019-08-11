import axios from 'axios'

// 查询城市信息
export const getCity = (data) => {
  return axios.get('/airs/city', {
    params: data
  })
}
// 查询机票信息
export const getAirList = (data) => {
  return axios.get('/airs', {
    params: data
  })
}
export const postAirOrders = (data, token) => {
  return axios.post('/airorders', data, { headers: {
    Authorization: `Bearer ${token}`
  } })
}
// export const payOrder = (data, token) => {
//   return axios.post('/airorders/pay', data, { headers: {
//     Authorization: `Bearer ${token}`
//   } })
// }
// export const payOrder = (id, token) => {
//   return axios.get('/airorders/' + id, { headers: {
//     Authorization: `Bearer ${token}`
//   } })
// }
