import * as types from '../mutation-types'
import kairoproductAPI from '@/api/kairoProduct'

export const state = {
  kairoproducts: [],
  loadingKairoProducts: false,
  showModalDeleteKairoProduct: false,
  currentKairoProduct: null,
  loadingCurrentKairoProduct: false
}

export const actions = {
  kairoProductCreate ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairoproductAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El boxe ha sido registrado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getKairoProducts ({ commit }, payload) {
    commit(types.REPLACE_LOADING_KAIRO_PRODUCTS, { status: true })

    return new Promise((resolve, reject) => {
      kairoproductAPI.get(payload)
        .then(response => {
          const kairoproducts = response.data.data
          commit(types.REPLACE_LOADING_KAIRO_PRODUCTS, { status: false })
          commit(types.REPLACE_KAIRO_PRODUCTS, {  kairoproducts })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_KAIRO_PRODUCTS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteKairoProduct ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_KAIRO_PRODUCT, payload)
  },

  updateKairoProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairoproductAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El boxe ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteKairoProduct({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairoproductAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_KAIRO_PRODUCT,{ kairoproduct: null })

          this._vm.$notify.success({
            title: 'Farmacia',
            message: 'El boxe ha sido eliminado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceCurrentKairoProduct ({ commit }, payload) {
    commit(types.REPLACE_KAIRO_PRODUCTS, payload)
  },

  getKairoProduct ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_KAIRO_PRODUCT, { status: true })
    commit(types.REPLACE_CURRENT_KAIRO_PRODUCT, { kairoproduct: null })

    return new Promise((resolve, reject) => {
      kairoproductAPI.getById(payload)
        .then(response => {
          const kairoproduct = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_KAIRO_PRODUCT, { status: false })
          commit(types.REPLACE_CURRENT_KAIRO_PRODUCT, { kairoproduct })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_KAIRO_PRODUCT, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_KAIRO_PRODUCTS] (state, { status }) {
    state.loadingKairoProducts = status
  },
  [types.REPLACE_KAIRO_PRODUCTS] (state, { kairoproducts }) {
    state.kairoproducts = kairoproducts
  },
  [types.REPLACE_SHOW_MODAL_DELETE_KAIRO_PRODUCT] (state, { status }) {
    state.replaceShowModalDeleteProduct = status
  },
  [types.REPLACE_CURRENT_KAIRO_PRODUCT] (state, { kairoproduct }) {
    state.currentKairoProduct = kairoproduct
  },
  [types.REPLACE_LOADING_CURRENT_KAIRO_PRODUCT] (state, { status }) {
    state.loadingCurrentKairoProduct = status
  }
}
