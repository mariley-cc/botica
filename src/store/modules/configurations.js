import * as types from '../mutation-types'
import configurationAPI from '@/api/configuration'

export const state = {
  configurations: [],
  loadingConfigurations: false,
  configurationsPublic: null,
  currency: null
}

export const actions = {
  getConfigurations ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CONFIGURATIONS, { status: true })

    return new Promise((resolve, reject) => {
      configurationAPI.get(payload)
        .then(response => {
          let configurations = response.data.data

          commit(types.REPLACE_LOADING_CONFIGURATIONS, { status: false })
          commit(types.REPLACE_CONFIGURATIONS, { configurations })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getNameCurrency ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      configurationAPI.getPublic(payload)
        .then(response => {
          let currency = response.data
          commit(types.REPLACE_NAME_CURRENCY, { currency })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getConfigurationPublic ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      configurationAPI.getPublic(payload)
        .then(response => {
          let configurations = response.data

          commit(types.REPLACE_CONFIGURATIONS_PUBLIC, { configurations })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updateConfiguration ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      configurationAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'La descripción ha sido actualizado con éxito.'
          })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

}

export const mutations = {

  [types.REPLACE_CONFIGURATIONS] (state, { configurations }) {
    state.configurations = configurations
  },
  [types.REPLACE_LOADING_CONFIGURATIONS] (state, { status }) {
    state.loadingConfigurations = status
  },
  [types.REPLACE_CONFIGURATIONS_PUBLIC] (state, { configurations }) {
    state.configurationsPublic = configurations
  },
  [types.REPLACE_NAME_CURRENCY] (state, { currency }) {
    state.currency = currency
  }
}
