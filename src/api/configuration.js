import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/configurations`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getPublic (payload = {}) {
    // GOPLAY_NETTELER_ACCOUNT, GOPLAY_NAME, GOPLAY_EMAIL, CURRENCY_CODE
    const params = payload.params || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/configuration`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const data = payload.data || {}
    const code = payload.code || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/configuration/${code}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
