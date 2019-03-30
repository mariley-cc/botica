import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  profile (payload = {}) {
    const data = payload.data || {}
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/settings/profile`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  uploadProfileImage (payload = {}) {
    const formData = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/settings/image`,
        method: 'post',
        data: formData
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  uploadDniImage (payload = {}) {
    const formData = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/settings/dni_image`,
        method: 'post',
        data: formData
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  uploadDniBackImage (payload = {}) {
    const formData = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/settings/dni_image_back`,
        method: 'post',
        data: formData
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  updatePassword (payload = {}) {
    const data = payload.data

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/settings/password`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getNetellerAccounts (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/profile/accounts/neteller`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  updateNetellerAccounts (payload = {}) {
    const data = payload.data || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/profile/accounts/neteller`,
        method: 'put',
        data
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
