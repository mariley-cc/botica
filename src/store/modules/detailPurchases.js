import * as types from '../mutation-types'
import detailPurchaseAPI from '@/api/detailPurchase'

export const state = {
  detailPurchases: [],
  loadingDetailPurchases: false
}

export const actions = {
  createDetailPurchases ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailPurchaseAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El producto ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getDetailPurchases ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DETAIL_PURCHASES, { status: true })

    return new Promise((resolve, reject) => {
      detailPurchaseAPI.get(payload)
        .then(response => {
          const purchase = response.data.data
          commit(types.REPLACE_LOADING_DETAIL_PURCHASES, { status: false })
          commit(types.REPLACE_DETAIL_PURCHASES, { purchase })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DETAIL_PURCHASES, { status: false })
          reject(error)
        })
    })
  },

  updatePurchases ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailPurchaseAPI.put(payload)
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
  }
}

export const mutations = {
  [types.REPLACE_LOADING_DETAIL_PURCHASES] (state, { status }) {
    state.loadingDetailPurchases = status
  },
  [types.REPLACE_DETAIL_PURCHASES] (state, { purchase }) {
    state.detailPurchases = purchase
  }
}
