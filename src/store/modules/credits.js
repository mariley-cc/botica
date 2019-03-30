import * as types from '../mutation-types'
import creditsAPI from '@/api/credit'

export const state = {
  credits: [],
  loadingCredits: false,
  currentCredit: null,
  showModalSuccessCredit: false,
  showModalIncreaseDecreaseCredits: false
}

export const actions = {
  getCredits ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CREDITS, { status: true })

    return new Promise((resolve, reject) => {
      creditsAPI.get(payload)
        .then(response => {
          let credits = response.data.data

          commit(types.REPLACE_LOADING_CREDITS, { status: false })
          commit(types.REPLACE_CREDITS, { credits })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getCredit ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      creditsAPI.getById(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updateCredit ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      creditsAPI.put(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  payCreditsWithCulqi ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      creditsAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'La transacción fue realizada con éxito.'
          })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  payCreditsWithNeteller ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      creditsAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'La transacción fue realizada con éxito.'
          })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  replaceShowModalSuccessCredit ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_SUCCESS_CREDIT, payload)
  },

  replaceShowModalIncreaseDecreaseCredits ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_INCREASE_DECREASE_CREDITS, payload)
  },

  replaceCurrentCredit ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_CREDIT, payload)
  }
}

export const mutations = {
  [types.REPLACE_LOADING_CREDITS] (state, { status }) {
    state.loadingCredits = status
  },
  [types.REPLACE_CREDITS] (state, { credits }) {
    state.credits = credits
  },
  [types.REPLACE_CURRENT_CREDIT] (state, { credit }) {
    state.currentCredit = credit
  },
  [types.REPLACE_SHOW_MODAL_SUCCESS_CREDIT] (state, { status }) {
    state.showModalSuccessCredit = status
  },
  [types.REPLACE_SHOW_MODAL_INCREASE_DECREASE_CREDITS] (state, { status }) {
    state.showModalIncreaseDecreaseCredits = status
  }
}
