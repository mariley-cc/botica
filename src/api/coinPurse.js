import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  sendToken (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/send-token`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  verifyToken (payload = {}) {
    const token = payload.token

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/verify-token/${token}`,
        method: 'post'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
