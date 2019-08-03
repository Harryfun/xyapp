export const setLocal = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data))
}
export const getLocal = (name) => {
  return JSON.parse(localStorage.getItem(name))
}
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
