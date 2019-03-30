import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  getRetirements (payload = {}) {
    const userId = payload.userId
    const data = payload.data
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/user/${userId}/retirements`,
        method: 'get',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getByDate (payload = {}) {
    const userId = payload.userId
    const params = payload.params
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/purchases-per-day`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
