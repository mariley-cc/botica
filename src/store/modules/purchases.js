import * as types from '../mutation-types'
import purchaseAPI from '@/api/purchase'

export const state = {
  purchases: [],
  loadingPurchases: false,
  showModalDeletePurchase: false,
  currentPurchase: null,
  loadingCurrentPurchase: false
}

export const actions = {
  createPurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El purchase ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getPurchases ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PURCHASES, { status: true })

    return new Promise((resolve, reject) => {
      purchaseAPI.get(payload)
        .then(response => {
          const purchases = response.data.data
          commit(types.REPLACE_LOADING_PURCHASES, { status: false })
          commit(types.REPLACE_PURCHASES, { purchases })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PURCHASES, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeletePurchase ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_PURCHASE, payload)
  },

  updatePurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El purchase ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deletePurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_PURCHASE, { purchase: null })

          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El purchase ha sido eliminado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceCurrentPurchase ({ commit }, payload) {
    commit(types.REPLACE_PURCHASES, payload)
  },

  getPurchase ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_PURCHASE, { status: true })
    commit(types.REPLACE_CURRENT_PURCHASE, { purchase: null })

    return new Promise((resolve, reject) => {
      purchaseAPI.getById(payload)
        .then(response => {
          const purchase = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_PURCHASE, { status: false })
          commit(types.REPLACE_CURRENT_PURCHASE, { purchase })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_PURCHASE, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_PURCHASES] (state, { status }) {
    state.loadingPurchases = status
  },
  [types.REPLACE_PURCHASES] (state, { purchases }) {
    state.purchases = purchases
  },
  [types.REPLACE_SHOW_MODAL_DELETE_PURCHASE] (state, { status }) {
    state.replaceShowModalDeletePurchase = status
  },
  [types.REPLACE_CURRENT_PURCHASE] (state, { purchase }) {
    state.currentPurchase = purchase
  },
  [types.REPLACE_LOADING_CURRENT_PURCHASE] (state, { status }) {
    state.loadingCurrentCreatePurchase = state
  }
}
