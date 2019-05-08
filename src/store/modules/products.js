import * as types from '../mutation-types'
import productAPI from '@/api/product'

export const state = {
  products: [],
  loadingProducts: false,
  costProductByLots: [],
  loadingCostProductsByLots: false,
  showModalDeleteProduct: false,
  currentProduct: null,
  loadingCurrentProduct: false
}

export const actions = {
  createProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      productAPI.post(payload)
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

  getProducts ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PRODUCTS, { status: true })

    return new Promise((resolve, reject) => {
      productAPI.get(payload)
        .then(response => {
          const products = response.data.data
          commit(types.REPLACE_LOADING_PRODUCTS, { status: false })
          commit(types.REPLACE_PRODUCTS, { products })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PRODUCTS, { status: false })
          reject(error)
        })
    })
  },

  getCostProductByLots ({ commit }, payload) {
    commit(types.REPLACE_LOADING_COST_PRODUCT_BY_LOTS, { status: true })

    return new Promise((resolve, reject) => {
      productAPI.getCostByLot(payload)
        .then(response => {
          const products = response.data.data
          commit(types.REPLACE_LOADING_COST_PRODUCT_BY_LOTS, { status: false })
          commit(types.REPLACE_COST_PRODUCTS_BY_LOTS, { products })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_COST_PRODUCT_BY_LOTS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteProduct ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_PRODUCT, payload)
  },

  deleteProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      productAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_PRODUCT, { product: null })

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

  replaceCurrentProduct ({ commit }, payload) {
    commit(types.REPLACE_PRODUCTS, payload)
  },

  getProduct ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_PRODUCT, { status: true })
    commit(types.REPLACE_CURRENT_PRODUCT, { product: null })

    return new Promise((resolve, reject) => {
      productAPI.getById(payload)
        .then(response => {
          const product = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_PRODUCT, { status: false })
          commit(types.REPLACE_CURRENT_PRODUCT, { product })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_PRODUCT, { status: false })

          reject(error)
        })
    })
  },
  updateProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      productAPI.put(payload)
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
  [types.REPLACE_LOADING_PRODUCTS] (state, { status }) {
    state.loadingProducts = status
  },
  [types.REPLACE_PRODUCTS] (state, { products }) {
    state.products = products
  },
  [types.REPLACE_LOADING_COST_PRODUCT_BY_LOTS] (state, { status }) {
    state.loadingCostProductsByLots = status
  },
  [types.REPLACE_COST_PRODUCTS_BY_LOTS] (state, { products }) {
    state.costProductsByLots = products
  },
  [types.REPLACE_SHOW_MODAL_DELETE_PRODUCT] (state, { status }) {
    state.replaceShowModalDeleteProduct = status
  },
  [types.REPLACE_CURRENT_PRODUCT] (state, { product }) {
    state.currentProduct = product
  },
  [types.REPLACE_LOADING_CURRENT_PRODUCT] (state, { status }) {
    state.loadingCurrentProduct = status
  }
}
