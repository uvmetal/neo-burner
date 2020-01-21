// httpHelpers.js
// http/https helpers

import axios from 'axios'
import regeneratorRuntime from 'regenerator-runtime'

let instance

export function init(options) {
  instance = axios.create(options)

  return instance
}

export function get(url) {
  // const response =  instance.get(url)
  // console.log(response.data)
  // return response

  return new Promise(function(resolve, reject) {
    instance.get(url).then(function (response) {
      // handle success
      console.log(response.data)
      resolve(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      reject(error)
    })
  })
}

export  function put(url, data) {
  // const response =  instance.put(url, data)
  // console.log(response.data)
  // return response

  return new Promise(function(resolve, reject) {
    instance.put(url, data).then(function (response) {
      // handle success
      console.log(response)
      resolve(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      reject(error)
    })
  })
}

export  function post(url, data) {
  // const response =  instance.post(url, data)
  // console.log(response.data)
  // return response

  return new Promise(function(resolve, reject) {
    instance.post(url, data).then(function (response) {
      // handle success
      console.log(response)
      resolve(response)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
      reject(error)
    })
  })
}
