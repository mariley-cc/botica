import * as types from '../mutation-types'
import productAPI from '@/api/product'

export const state = {
    products: [],
    loadingProducts: false,
    showModalDeleteProduct: false,
    currentProduct: null,
    loadingCurrentProduct: false
}

export const actions = {
    productSave ({ commit }, payload) {
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
        commit(types.REPLACE_LOADING_PRODUCTS, { status: true})

        return new Promise((resolve, reject) => {
            productAPI.get(payload)
            .then(response => {
                const products = response.data.data
                commit(types.REPLACE_LOADING_PRODUCTS, { status: false})
                commit(types.REPLACE_PRODUCTS, { products })
                
                resolve(response)
            })
            .cath(error => {
                commit(types.REPLACE_LOADING_PRODUCTS, {status: false})
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
    replaceCurrentProduct ({ commit }, payload) {
        commit(types.REPLACE_CURRENT_PRODUCT, payload)
    },
    
    getProduct ({ commit }, payload) {
        commit(types.REPLACE_LOADING_CURRENT_PRODUCT, { status: true })
        commit(types.REPLACE_CURRENT_PRODUCT, { product: null })
    
        return new Promise((resolve, reject) => {
          userAPI.getById(payload)
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
}

export const mutation = {
    [types.REPLACE_LOADING_PRODUCTS] (state, { status }) {
        state.loadingProducts = status
    },
    [types.REPLACE_PRODUCTS] (state, { products }) {
        state.products = products
    },
    [types.REPLACE_SHOW_MODAL_DELETE_PRODUCT] ( state, { status }) {
        state.replaceShowModalDeleteProduct = status
    },
    [types.REPLACE_CURRENT_PRODUCT] (state , { product }) {
        state.currentProduct = product
    },
    [types.REPLACE_LOADING_CURRENT_PRODUCT] (state, { status }) {
        state.loadingCurrentProduct = status
    }
}