import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const serviceId = payload.serviceId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services/${serviceId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getPlans (payload = {}) {
    const serviceId = payload.serviceId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services/${serviceId}/plans`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  post (payload = {}) {
    const vForm = payload.vForm
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services`,
        method: 'post',
        data: vForm
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const serviceId = payload.serviceId
    const vForm = payload.vForm
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services/${serviceId}`,
        method: 'put',
        data: vForm
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  delete (payload = {}) {
    const serviceId = payload.serviceId
    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/services/${serviceId}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  uploadServiceImage (payload = {}) {
    const formData = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/services/image`,
        method: 'post',
        data: formData
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
