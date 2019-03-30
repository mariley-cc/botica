import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getById (payload = {}) {
    const planId = payload.planId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans/${planId}`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  uploadImage (payload = {}) {
    const formData = payload.formData

    return new Promise((resolve, reject) => {
      axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `${HOST}/plans/image`,
        method: 'post',
        data: formData
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getBySlug (payload = {}) {
    const planSlug = payload.planSlug

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans/${planSlug}`,
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
        url: `${HOST}/plans`,
        method: 'post',
        data: vForm
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  put (payload = {}) {
    const planId = payload.planId
    const vForm = payload.vForm

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans/${planId}`,
        method: 'put',
        data: vForm
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  delete (payload = {}) {
    const planId = payload.planId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans/${planId}`,
        method: 'delete'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getServices (payload = {}) {
    const planId = payload.planId

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/plans/${planId}/services`,
        method: 'get'
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

}
