import * as types from '../mutation-types'
import detailSaleAPI from '@/api/detailSale'

export const state = {
  detailSales: [],
  loadingDetailSales: false
}

export const actions = {
  createDetailSale ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailSaleAPI.post(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getDetailSales ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DETAIL_PRODUCTS, { status: true })

    return new Promise((resolve, reject) => {
      detailSaleAPI.get(payload)
        .then(response => {
          const products = response.data.data
          commit(types.REPLACE_LOADING_DETAIL_PRODUCTS, { status: false })
          commit(types.REPLACE_DETAIL_PRODUCTS, { products })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DETAIL_PRODUCTS, { status: false })
          reject(error)
        })
    })
  },

  updateDetailSale ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailSaleAPI.put(payload)
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
  [types.REPLACE_LOADING_DETAIL_PRODUCTS] (state, { status }) {
    state.loadingDetailSales = status
  },
  [types.REPLACE_DETAIL_PRODUCTS] (state, { products }) {
    state.detailSales = products
  }
}
