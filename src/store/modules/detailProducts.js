import * as types from '../mutation-types'
import detailProductAPI from '@/api/detailProduct'

export const state = {
  detailProducts: [],
  loadingDetailProducts: false
}

export const actions = {
  createDetailProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailProductAPI.post(payload)
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

  getDetailProducts ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DETAIL_PRODUCTS, { status: true })

    return new Promise((resolve, reject) => {
      detailProductAPI.get(payload)
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

  updateProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      detailProductAPI.put(payload)
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
    state.loadingDetailProducts = status
  },
  [types.REPLACE_DETAIL_PRODUCTS] (state, { products }) {
    state.detailProducts = products
  }
}
