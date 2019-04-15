import * as types from '../mutation-types'
import kairoproductAPI from '@/api/kairoProduct'



export const state = {
  kairoproduct: [],
  loadingKairoProduct: false,
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
    commit(types.REPLACE_LOADING_KAIROPRODUCTS, { status: true })

    return new Promise((resolve, reject) => {
      kairoproductAPI.get(payload)
        .then(response => {
          const  kairoproduct = response.data.data
          commit(types.REPLACE_LOADING_KAIROPRODUCTS, { status: false })
          commit(types.REPLACE_KAIROPRODUCTS, {  kairoproduct })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_KAIROPRODUCTS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteKairoProduct ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_KAIROPRODUCT, payload)
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

  deleteKairoProduct ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairoproductAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_KAIROPRODUCT, { kairoproduct: null })

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
    commit(types.REPLACE_KAIROPRODUCTS, payload)
  },

  getKairoProduct ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_KAIROPRODUCT, { status: true })
    commit(types.REPLACE_CURRENT_KAIROPRODUCT, { kairoproduct: null })

    return new Promise((resolve, reject) => {
      kairoproductAPI.getById(payload)
        .then(response => {
          const kairoproduct = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_KAIROPRODUCT, { status: false })
          commit(types.REPLACE_CURRENT_KAIROPRODUCT, { kairoproduct })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_KAIROPRODUCT, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_KAIROPRODUCTS] (state, { status }) {
    state.loadingKairoProduct = status
  },
  [types.REPLACE_KAIROPRODUCTS] (state, { kairoproduct }) {
    state.kairoproduct = kairoproduct
  },
  [types.REPLACE_SHOW_MODAL_DELETE_KAIROPRODUCT] (state, { status }) {
    state.replaceShowModalDeleteLaboratory = status
  },
  [types.REPLACE_CURRENT_KAIROPRODUCT] (state, { kairoproduct }) {
    state.currentKairoProduct = kairoproduct
  },
  [types.REPLACE_LOADING_CURRENT_KAIROPRODUCT] (state, { status }) {
    state.loadingCurrentKairoProduct = status
  }
}
