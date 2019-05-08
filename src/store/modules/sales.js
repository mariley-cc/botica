import * as types from '../mutation-types'
import saleAPI from '@/api/sale'

export const state = {
  sales: [],
  loadingSales: false,
  showModalDeleteSale: false,
  currentSale: null,
  loadingCurrentSale: false,
  showModalDetailSale: false
}

export const actions = {
  saleSave ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      saleAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'La venta ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getSales ({ commit }, payload) {
    commit(types.REPLACE_LOADING_SALES, { status: true })

    return new Promise((resolve, reject) => {
      saleAPI.get(payload)
        .then(response => {
          const sales = response.data.data
          commit(types.REPLACE_LOADING_SALES, { status: false })
          commit(types.REPLACE_SALES, { sales })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_SALES, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteSale ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_SALE, payload)
  },

  replaceShowModalDetailSale ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DETAIL_SALE, payload)
  },

  updateSale ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      saleAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El sale ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteSale ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      saleAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_SALE, { sale: null })

          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El sale ha sido eliminado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceCurrentSale ({ commit }, payload) {
    commit(types.REPLACE_SALES, payload)
  },

  getSale ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_SALE, { status: true })
    commit(types.REPLACE_CURRENT_SALE, { sale: null })

    return new Promise((resolve, reject) => {
      saleAPI.getById(payload)
        .then(response => {
          const sale = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_SALE, { status: false })
          commit(types.REPLACE_CURRENT_SALE, { sale })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_SALE, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_SALES] (state, { status }) {
    state.loadingSales = status
  },
  [types.REPLACE_SALES] (state, { sales }) {
    state.sales = sales
  },
  [types.REPLACE_SHOW_MODAL_DELETE_SALE] (state, { status }) {
    state.showModalDeleteSale = status
  },
  [types.REPLACE_SHOW_MODAL_DETAIL_SALE] (state, { status }) {
    state.showModalDetailSale = status
  },
  [types.REPLACE_CURRENT_SALE] (state, { sale }) {
    state.currentSale = sale
  },
  [types.REPLACE_LOADING_CURRENT_SALE] (state, { status }) {
    state.loadingCurrentSale = status
  }
}
