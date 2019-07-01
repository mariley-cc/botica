import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

  post (payload = {}) {
    const data = payload.data || {}
    console.log(data)
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/registereds`,
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
        url: `${HOST}/registereds`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
