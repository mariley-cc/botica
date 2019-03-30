import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/credits`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const creditId = payload.creditId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/credits/${creditId}`,
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
        url: `${HOST}/credits`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const creditId = payload.creditId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/credits/${creditId}`,
        method: 'put'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  delete (payload = {}) {
    const creditId = payload.creditId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/credits/${creditId}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
