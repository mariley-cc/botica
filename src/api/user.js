import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  register (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/register`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  login (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/login`,
        method: 'post',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  logout (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/logout`,
        method: 'post'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  user (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/user`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  get (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const userId = payload.userId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const userId = payload.userId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  updateClient (payload = {}) {
    const userId = payload.userId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/client/${userId}`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateState (payload = {}) {
    const userId = payload.userId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/status`,
        method: 'put'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  delete (payload = {}) {
    const userId = payload.userId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getPurchases (payload = {}) {
    const userId = payload.userId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/purchases`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getSubscriptions (payload = {}) {
    const userId = payload.userId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${userId}/subscriptions`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getInfoUserGoogle (payload = {}) {
    const token = payload.token
    return new Promise((resolve, reject) => {
      axios({
        url: `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  loginGoogle (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/login/google`,
        method: 'post',
        data: params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  loginFacebook (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/login/facebook`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  updatePassword (payload = {}) {
    const id = payload.userId
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/users/${id}/password`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  sendTokenForResetPassword (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/password/email`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  resetPassword (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/password/reset`,
        method: 'post',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
