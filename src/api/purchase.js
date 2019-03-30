import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    const params = payload.params
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/purchases`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getStates (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/state-purchases`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const purchaseId = payload.purchaseId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/purchases/${purchaseId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  post (payload = {}) {
    const data = payload.data
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/purchases`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const purchaseId = payload.purchaseId
    const vForm = payload.vForm
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/purchases/${purchaseId}`,
        method: 'put',
        data: vForm
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  delete (payload = {}) {
    const purchaseId = payload.purchaseId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/purchases/${purchaseId}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
