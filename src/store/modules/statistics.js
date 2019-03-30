import * as types from '../mutation-types'
import statisticAPI from '@/api/statistic'

export const state = {
  retirements: [],
  loadingRetirements: false,
  purchasesPerDay: null,
  showModalUploadScreenshot: false
}

export const actions = {

  getRetirements ({ commit }, payload) {
    commit(types.REPLACE_LOADING_RETIREMENTS, { status: true })
    return new Promise((resolve, reject) => {
      statisticAPI.getRetirements(payload)
        .then(response => {
          const retirements = response.data.data
          commit(types.REPLACE_LOADING_RETIREMENTS, { status: false })
          commit(types.REPLACE_RETIREMENTS, { retirements })
          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_RETIREMENTS, { status: false })
          reject(error)
        })
    })
  },

  getPurchasesPerDay ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      statisticAPI.getByDate(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceShowModalUploadScreenShot ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_UPLOAD_SCREENSHOT, payload)
  }
}

export const mutations = {
  [types.REPLACE_LOADING_RETIREMENTS] (state, { status }) {
    state.loadingRetirements = status
  },
  [types.REPLACE_RETIREMENTS] (state, { retirements }) {
    state.retirements = retirements
  },
  [types.REPLACE_SHOW_MODAL_UPLOAD_SCREENSHOT] (state, { status }) {
    state.showModalUploadScreenshot = status
  }
}
