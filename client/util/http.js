/**
 * 封装axios
 * 用于 客户端发送 API 接口请求的统一方法
 */

import axios from 'axios'

const baseUrl = 'http://localhost:8887/'
const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  const finalUrl = `api/${url}?${str.substr(0, str.length - 1)}`
  console.log(finalUrl)
  return `${baseUrl}${finalUrl}`
}
export const get = (url, param) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, param))
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch((err) => {
        if (err.response) {
          reject(err.response.data)
        } else {
          reject(err)
        }
      })
  })
)

export const post = (url, param, postData) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, param), postData)
      .then((resp) => {
        const { data } = resp
        if (data && data.success === true) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch((err) => {
        if (err.response) {
          reject(err.response.data)
        } else {
          reject(err)
        }
      })
  })
)
