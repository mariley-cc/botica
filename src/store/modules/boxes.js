import * as types from '../mutation-types'
import boxeAPI from '@/api/boxe'

export const state = {
  boxes: [],
  loadingBoxes: false,
  showModalDeleteBoxe: false,
  currentBoxe: null,
  loadingCurrentBoxe: false
}

export const actions = {
  boxeSave ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      boxeAPI.post(payload)
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

  getBoxes ({ commit }, payload) {
    commit(types.REPLACE_LOADING_BOXES, { status: true })

    return new Promise((resolve, reject) => {
      boxeAPI.get(payload)
        .then(response => {
          const boxes = response.data.data
          commit(types.REPLACE_LOADING_BOXES, { status: false })
          commit(types.REPLACE_BOXES, { boxes })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_BOXES, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteBoxe ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_BOXE, payload)
  },

  updateBoxe ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      boxeAPI.put(payload)
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

  deleteBoxe ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      boxeAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_BOXE, { boxe: null })

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

  replaceCurrentBoxe ({ commit }, payload) {
    commit(types.REPLACE_BOXES, payload)
  },

  getBoxe ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_BOXE, { status: true })
    commit(types.REPLACE_CURRENT_BOXE, { boxe: null })

    return new Promise((resolve, reject) => {
      boxeAPI.getById(payload)
        .then(response => {
          const boxe = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_BOXE, { status: false })
          commit(types.REPLACE_CURRENT_BOXE, { boxe })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_BOXE, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_BOXES] (state, { status }) {
    state.loadingBoxes = status
  },
  [types.REPLACE_BOXES] (state, { boxes }) {
    state.boxes = boxes
  },
  [types.REPLACE_SHOW_MODAL_DELETE_BOXE] (state, { status }) {
    state.replaceShowModalDeleteBoxe = status
  },
  [types.REPLACE_CURRENT_BOXE] (state, { boxe }) {
    state.currentBoxe = boxe
  },
  [types.REPLACE_LOADING_CURRENT_BOXE] (state, { status }) {
    state.loadingCurrentBoxe = status
  }
}
