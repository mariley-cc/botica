import * as types from '../mutation-types'
import kairocompositionAPI from '@/api/kairoComposition'

export const state = {
  kairocompositions: [],
  KairoCompositiongKairoCompositions: false,
  showModalDeleteKairoComposition: false,
  currentKairoComposition: null,
  loadingCurrentKairoComposition: false
}

export const actions = {
  kairoCompositionCreate ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairocompositionAPI.post(payload)
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

  getKairoCompositions ({ commit }, payload) {
    commit(types.REPLACE_LOADING_KAIRO_COMPOSITIONS, { status: true })

    return new Promise((resolve, reject) => {
      kairocompositionAPI.get(payload)
        .then(response => {
          const kairocompositions = response.data.data
          commit(types.REPLACE_LOADING_KAIRO_COMPOSITIONS, { status: false })
          commit(types.REPLACE_KAIRO_COMPOSITIONS, { kairocompositions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_KAIRO_COMPOSITIONS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteKairoComposition ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_KAIRO_COMPOSITION, payload)
  },

  updateKairoComposition ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairocompositionAPI.put(payload)
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

  deleteKairoComposition ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairocompositionAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_KAIRO_COMPOSITION, { kairocomposition: null })

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

  replaceCurrentKairoComposition ({ commit }, payload) {
    commit(types.REPLACE_KAIRO_COMPOSITIONS, payload)
  },

  getKairoComposition ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_KAIRO_COMPOSITION, { status: true })
    commit(types.REPLACE_CURRENT_KAIRO_COMPOSITION, { kairocompositions: null })

    return new Promise((resolve, reject) => {
      kairocompositionAPI.getById(payload)
        .then(response => {
          const kairocomposition = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_KAIRO_COMPOSITION, { status: false })
          commit(types.REPLACE_CURRENT_KAIRO_COMPOSITION, { kairocomposition })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_KAIRO_COMPOSITION, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_KAIRO_COMPOSITIONS] (state, { status }) {
    state.loadingKairoCompositions = status
  },
  [types.REPLACE_KAIRO_COMPOSITIONS] (state, { kairocompositions }) {
    state.kairocompositions = kairocompositions
  },
  [types.REPLACE_SHOW_MODAL_DELETE_KAIRO_COMPOSITION] (state, { status }) {
    state.replaceShowModalDeleteKairoComposition = status
  },
  [types.REPLACE_CURRENT_KAIRO_COMPOSITION] (state, { kairocomposition }) {
    state.currentKairoComposition = kairocomposition
  },
  [types.REPLACE_LOADING_CURRENT_KAIRO_COMPOSITION] (state, { status }) {
    state.loadingCurrentKairoComposition = status
  }
}
