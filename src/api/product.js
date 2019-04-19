import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

  post (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/products`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/products`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const productId = payload.productId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/products/${productId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  put (payload = {}) {
    const productId = payload.productId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/products/${productId}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
