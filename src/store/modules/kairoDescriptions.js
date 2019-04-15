import * as types from '../mutation-types'
import kairodescriptionAPI from '@/api/kairoDescription'



export const state = {
  kairodescriptions: [],
  loadingKairoDescriptions: false,
  showModalDeleteKairoDescription: false,
  currentKairoDescription: null,
  loadingCurrentKairoDescription: false
}

export const actions = {
  kairoDescriptionCreate ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairodescriptionAPI.post(payload)
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

  getKairoDescriptions ({ commit }, payload) {
    commit(types.REPLACE_LOADING_KAIRODESCRIPTIONS, { status: true })

    return new Promise((resolve, reject) => {
      kairodescriptionAPI.get(payload)
        .then(response => {
          const  kairodescriptions = response.data.data
          commit(types.REPLACE_LOADING_KAIRODESCRIPTIONS, { status: false })
          commit(types.REPLACE_KAIRODESCRIPTIONS, {  kairodescriptions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_KAIRODESCRIPTIONS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteKairoDescription ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_KAIRODESCRIPTION, payload)
  },

  updateKairoDescription ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairodescriptionAPI.put(payload)
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

  deleteKairoDescription({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairodescriptionAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_KAIRODESCRIPTION, { kairodescriptions: null })

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

  replaceCurrentKairoDescription ({ commit }, payload) {
    commit(types.REPLACE_KAIRODESCRIPTIONS, payload)
  },

  getKairoDescription ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_KAIRODESCRIPTION, { status: true })
    commit(types.REPLACE_CURRENT_KAIRODESCRIPTION, { kairodescriptions: null })

    return new Promise((resolve, reject) => {
      kairodescriptionAPI.getById(payload)
        .then(response => {
          const kairodescriptions = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_KAIRODESCRIPTION, { status: false })
          commit(types.REPLACE_CURRENT_KAIRODESCRIPTION, { kairodescriptions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_KAIRODESCRIPTION, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_KAIRODESCRIPTIONS] (state, { status }) {
    state.loadingKairoDescriptions = status
  },
  [types.REPLACE_KAIRODESCRIPTIONS] (state, { kairodescriptions }) {
    state.kairodescriptions = kairodescriptions
  },
  [types.REPLACE_SHOW_MODAL_DELETE_KAIRODESCRIPTION] (state, { status }) {
    state.replaceShowModalDeleteLaboratory = status
  },
  [types.REPLACE_CURRENT_KAIRODESCRIPTION] (state, { kairodescriptions }) {
    state.currentKairoDescription = kairodescriptions
  },
  [types.REPLACE_LOADING_CURRENT_KAIRODESCRIPTION] (state, { status }) {
    state.loadingCurrentKairoDescription = status
  }
}
