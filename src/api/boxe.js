import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

  post (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/boxes`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  get (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/boxes`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getById (payload = {}) {
    const Id = payload.Id

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/boxes/${Id}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  put (payload = {}) {
    const Id = payload.Id
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/boxes/${Id}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
