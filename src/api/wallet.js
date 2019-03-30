import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  getTransactions (payload = {}) {
    const userId = payload.userId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/wallet/transactions`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  putCredits (payload = {}) {
    const userId = payload.userId
    const data = payload.data
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/wallet/edit-credits`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  putStateWallet (payload = {}) {
    const userId = payload.userId
    const data = payload.data
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/wallet/state`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
