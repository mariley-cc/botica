import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/subscriptions`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getNotCurrent (payload = {}) {
    const userId = payload.userId || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/subscriptions/not_current`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getCurrent (payload = {}) {
    const userId = payload.userId || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/subscription/current`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const subscriptionId = payload.subscriptionId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/subscriptions/${subscriptionId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  post (payload = {}) {
    const userId = payload.userId || {}
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/subscription`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const subscriptionId = payload.subscriptionId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/subscriptions/${subscriptionId}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  subscription (payload = {}) {
    const userId = payload.userId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/subscription`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  cancellation (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/subscriptions/cancellation`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
