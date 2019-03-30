import * as types from '../mutation-types'
import serviceAPI from '@/api/service'

export const state = {
  services: [],
  loadingServices: false,
  // web
  serviceSelected: null
}

export const actions = {
  getServices ({ commit }, payload) {
    commit(types.REPLACE_LOADING_SERVICES, { status: true })

    return new Promise((resolve, reject) => {
      serviceAPI.get(payload)
        .then(response => {
          let services = response.data.data

          commit(types.REPLACE_LOADING_SERVICES, { status: false })
          commit(types.REPLACE_SERVICES, { services })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getService ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.getById(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getPlansOfService ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.getPlans(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  createService ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.post(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updateService ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.put(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  deleteService ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.delete(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  uploadServiceImage ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      serviceAPI.uploadServiceImage(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceServiceSelected ({ commit }, payload) {
    commit(types.REPLACE_SERVICE_SELECTED, payload)
  }

}

export const mutations = {
  [types.REPLACE_LOADING_SERVICES] (state, { status }) {
    state.loadingServices = status
  },
  [types.REPLACE_SERVICES] (state, { services }) {
    state.services = services
  },
  [types.REPLACE_SERVICE_SELECTED] (state, { service }) {
    state.serviceSelected = service
  }
}
