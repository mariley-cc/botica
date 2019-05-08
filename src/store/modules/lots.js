import * as types from '../mutation-types'
import lotAPI from '@/api/lot'

export const state = {
  lots: [],
  loadingLots: false
}

export const actions = {
  getLots ({ commit }, payload) {
    commit(types.REPLACE_LOADING_LOTS, { status: true })

    return new Promise((resolve, reject) => {
      lotAPI.get(payload)
        .then(response => {
          const lots = response.data.data

          commit(types.REPLACE_LOADING_LOTS, { status: false })
          commit(types.REPLACE_LOTS, { lots })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_LOTS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_LOTS] (state, { status }) {
    state.loadingLots = status
  },
  [types.REPLACE_LOTS] (state, { lots }) {
    state.lots = lots
  }
}
