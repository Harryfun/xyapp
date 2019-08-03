import axios from 'axios'
// 查询酒店
export const getPosts = (data) => {
  return axios.get('posts', { params: data })
}
