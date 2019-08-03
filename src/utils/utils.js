export const setLocal = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data))
}
export const getLocal = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export const formatDate = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
