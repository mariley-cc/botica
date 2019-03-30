import * as types from '../mutation-types'
import purchaseAPI from '@/api/purchase'

export const state = {
  purchases: [],
  loadingPurchases: false,
  statePurchases: [],
  loadingStatePurchases: false,
  purchaseSelected: null,
  statePurchaseSelected: null,
  showModalConfirmationChangeState: false,
  showModalChangeRefereeID: false
}

export const actions = {
  getPurchases ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PURCHASES, { status: true })

    return new Promise((resolve, reject) => {
      purchaseAPI.get(payload)
        .then(response => {
          let purchases = response.data.data

          commit(types.REPLACE_LOADING_PURCHASES, { status: false })
          commit(types.REPLACE_PURCHASES, { purchases })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getPurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.getById(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getStatePurchases ({ commit }, payload) {
    commit(types.REPLACE_LOADING_STATE_PURCHASES, { status: true })

    return new Promise((resolve, reject) => {
      purchaseAPI.getStates(payload)
        .then(response => {
          let states = response.data.data

          commit(types.REPLACE_LOADING_STATE_PURCHASES, { status: false })
          commit(types.REPLACE_STATE_PURCHASES, { states })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  createPurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'La Apuesta se realizo con éxito.'
          })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updatePurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.put(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  deletePurchase ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      purchaseAPI.delete(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  replaceStatePurchases ({ commit }, payload) {
    commit(types.REPLACE_STATE_PURCHASES, payload)
  },

  replacePurchaseSelected ({ commit }, payload) {
    commit(types.REPLACE_PURCHASE_SELECTED, payload)
  },

  replaceStatePurchaseSelected ({ commit }, payload) {
    commit(types.REPLACE_STATE_PURCHASE_SELECTED, payload)
  },

  replaceShowModalConfirmationChangeState ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_CONFIRMATION_CHANGE_STATE, payload)
  },

  replaceShowModalChangeRefereeID ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_CHANGE_REFEREE_ID, payload)
  }
}

export const mutations = {
  [types.REPLACE_LOADING_PURCHASES] (state, { status }) {
    state.loadingPurchases = status
  },
  [types.REPLACE_PURCHASES] (state, { purchases }) {
    state.purchases = purchases
  },
  [types.REPLACE_STATE_PURCHASES] (state, { states }) {
    state.statePurchases = states
  },
  [types.REPLACE_LOADING_STATE_PURCHASES] (state, { status }) {
    state.loadingStatePurchases = status
  },
  [types.REPLACE_SHOW_MODAL_CONFIRMATION_CHANGE_STATE] (state, { status }) {
    state.showModalConfirmationChangeState = status
  },
  [types.REPLACE_PURCHASE_SELECTED] (state, { purchase }) {
    state.purchaseSelected = purchase
  },
  [types.REPLACE_STATE_PURCHASE_SELECTED] (state, { statePurchase }) {
    state.statePurchaseSelected = statePurchase
  },
  [types.REPLACE_SHOW_MODAL_CHANGE_REFEREE_ID] (state, { status }) {
    state.showModalChangeRefereeID = status
  }
}
