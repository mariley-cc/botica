import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  getUsers (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/dashboardUsers`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getPurchases (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/dashboardPurchases`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
