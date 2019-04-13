import * as types from '../mutation-types'
import providerAPI from '@/api/provider'

export const state = {
  providers: [],
  loadingProviders: false,
  showModalDeleteProvider: false,
  currentProduct: null,
  loadingCurrentProvider: false
}

export const actions = {
  providerSave ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      providerAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El proveedor ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getProviders ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PROVIDERS, { status: true })

    return new Promise((resolve, reject) => {
      providerAPI.get(payload)
        .then(response => {
          const providers = response.data.data
          commit(types.REPLACE_LOADING_PROVIDERS, { status: false })
          commit(types.REPLACE_PROVIDERS, { providers })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PROVIDERS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteProvider ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_PROVIDER, payload)
  },

  deleteProvider ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      providerAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_PROVIDER, { provider: null })

          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El Producto ha sido eliminado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceCurrentProvider ({ commit }, payload) {
    commit(types.REPLACE_PROVIDERS, payload)
  },
  updateProvider ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      providerAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El usuario ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getProvider ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_PROVIDER, { status: true })
    commit(types.REPLACE_CURRENT_PROVIDER, { provider: null })

    return new Promise((resolve, reject) => {
      providerAPI.getById(payload)
        .then(response => {
          const provider = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_PROVIDER, { status: false })
          commit(types.REPLACE_CURRENT_PROVIDER, { provider })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_PROVIDER, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_PROVIDERS] (state, { status }) {
    state.loadingProviders = status
  },
  [types.REPLACE_PROVIDERS] (state, { providers }) {
    state.providers = providers
  },
  [types.REPLACE_SHOW_MODAL_DELETE_PROVIDER] (state, { status }) {
    state.replaceShowModalDeleteProvider = status
  },
  [types.REPLACE_CURRENT_PROVIDER] (state, { provider }) {
    state.currentProduct = provider
  },
  [types.REPLACE_LOADING_CURRENT_PROVIDER] (state, { status }) {
    state.loadingCurrentProvider = status
  }
}
