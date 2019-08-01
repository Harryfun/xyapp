import axios from 'axios'
// 获取轮播图
export const getBanners = () => {
  return axios.get('scenics/banners')
}
// 获取游记列表
export const getPosts = (data) => {
  return axios.get('posts', { params: data })
}
