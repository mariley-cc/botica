import * as types from '../mutation-types'
import dashboardAPI from '@/api/dashboard'

export const state = {
  dashboard: [],
  loadingDashboard: false
}
export const actions = {
  getDashboard ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DASHBOARD, { status: true })

    return new Promise((resolve, reject) => {
      dashboardAPI.get(payload)
        .then(response => {
          const dashboard = response.data.data
          commit(types.REPLACE_LOADING_DASHBOARD, { status: false })
          commit(types.REPLACE_DASHBOARD, { dashboard })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DASHBOARD, { status: false })
          reject(error)
        })
    })
  }
}

export const mutation = {
  [types.REPLACE_LOADING_DASHBOARD] (state, { status }) {
    state.loadingDashboard = status
  },
  [types.REPLACE_DASHBOARD] (state, { dashboard }) {
    state.dashboard = dashboard
  }
}
