import * as types from '../mutation-types'
import kairocompositionAPI from '@/api/kairoComposition'



export const state = {
  kairocompositions:[],
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
    commit(types.REPLACE_LOADING_KAIROCOMPOSITIONS, { status: true })

    return new Promise((resolve, reject) => {
      kairocompositionAPI.get(payload)
        .then(response => {
          const  kairocompositions = response.data.data
          commit(types.REPLACE_LOADING_KAIROCOMPOSITIONS, { status: false })
          commit(types.REPLACE_KAIROCOMPOSITIONS, {  kairocompositions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_KAIROCOMPOSITIONS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteKairoComposition ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_KAIROCOMPOSITION, payload)
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

  deleteKairoComposition({ commit }, payload) {
    return new Promise((resolve, reject) => {
      kairocompositionAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_KAIROCOMPOSITION, { kairocomposition: null })

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

  replaceCurrentKairoComposition({ commit }, payload) {
    commit(types.REPLACE_KAIROCOMPOSITIONS, payload)
  },

  getKairoComposition ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_KAIROCOMPOSITION, { status: true })
    commit(types.REPLACE_CURRENT_KAIROCOMPOSITION, { kairocompositions: null })

    return new Promise((resolve, reject) => {
      kairocompositionAPI.getById(payload)
        .then(response => {
          const kairocomposition = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_KAIROCOMPOSITION, { status: false })
          commit(types.REPLACE_CURRENT_KAIROCOMPOSITION, { kairocomposition })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_KAIROCOMPOSITION, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_KAIROCOMPOSITIONS] (state, { status }) {
    state.loadingKairoCompositions = status
  },
  [types.REPLACE_KAIROCOMPOSITIONS] (state, { kairocompositions }) {
    state.kairocompositions = kairocompositions
  },
  [types.REPLACE_SHOW_MODAL_DELETE_KAIROCOMPOSITION] (state, { status }) {
    state.replaceShowModalDeleteKairoComposition = status
  },
  [types.REPLACE_CURRENT_KAIROCOMPOSITION] (state, { kairocomposition }) {
    state.currentKairoComposition = kairocomposition
  },
  [types.REPLACE_LOADING_CURRENT_KAIROCOMPOSITION] (state, { status }) {
    state.loadingCurrentKairoComposition = status
  }
}
