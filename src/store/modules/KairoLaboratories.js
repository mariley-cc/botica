import * as types from '../mutation-types'
import laboratoryAPI from '@/api/kairoLaboratories'

export const state = {
  laboratories: [],
  loadingLaboratories: false,
  showModalDeleteLaboratory: false,
  currentLaboratory: null,
  loadingCurrentLaboratory: false
}

export const actions = {
  laboratoryCreate ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      laboratoryAPI.post(payload)
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

  getLaboratories ({ commit }, payload) {
    commit(types.REPLACE_LOADING_LABORATORIES, { status: true })

    return new Promise((resolve, reject) => {
      laboratoryAPI.get(payload)
        .then(response => {
          const laboratories = response.data.data
          commit(types.REPLACE_LOADING_LABORATORIES, { status: false })
          commit(types.REPLACE_LABORATORIES, { laboratories })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_LABORATORIES, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteLaboratory ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_LABORATORY, payload)
  },

  updateLaboratory ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      laboratoryAPI.put(payload)
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

  deleteLaboratory ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      laboratoryAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_LABORATORY, { laboratory: null })

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

  replaceCurrentLaboratory ({ commit }, payload) {
    commit(types.REPLACE_LABORATORIES, payload)
  },

  getLaboratory ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_LABORATORY, { status: true })
    commit(types.REPLACE_CURRENT_LABORATORY, { laboratory: null })

    return new Promise((resolve, reject) => {
      laboratoryAPI.getById(payload)
        .then(response => {
          const laboratory = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_LABORATORY, { status: false })
          commit(types.REPLACE_CURRENT_LABORATORY, { laboratory })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_LABORATORY, { status: false })

          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_LABORATORIES] (state, { status }) {
    state.loadingLaboratories = status
  },
  [types.REPLACE_LABORATORIES] (state, { laboratories }) {
    state.laboratories = laboratories
  },
  [types.REPLACE_SHOW_MODAL_DELETE_LABORATORY] (state, { status }) {
    state.replaceShowModalDeleteLaboratory = status
  },
  [types.REPLACE_CURRENT_LABORATORY] (state, { laboratory }) {
    state.currentLaboratory = laboratory
  },
  [types.REPLACE_LOADING_CURRENT_LABORATORY] (state, { status }) {
    state.loadingCurrentLaboratory = status
  }
}
