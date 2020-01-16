// httpHelpers.js
// http/https helpers

import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

let instance

export async function init(options) {
  instance = await axios.create(options)

  return instance
}

export async function get(url) {
  const response = await instance.get(url)
  console.log(response.data)
  return response
}

export async function put(url, data) {
  const response = await instance.put(url, data)
  console.log(response.data)
  return response
}

export async function post(url, data) {
  const response = await instance.post(url, data)
  console.log(response.data)
  return response
}
