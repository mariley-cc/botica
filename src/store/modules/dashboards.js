import * as types from '../mutation-types'
import dashboardAPI from '@/api/dashboard'

export const state = {
  dasboardUsers: [],
  loadingDasboardUsers: false,
  dashboardPurchases: [],
  loadingDashboardPurchases: false
}

export const actions = {
  getDashboardPurchases ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DASHBOARD_PURCHASES, { status: true })

    return new Promise((resolve, reject) => {
      dashboardAPI.getPurchases(payload)
        .then(response => {
          let purchases = response.data.data

          purchases.forEach((element, i) => {
            purchases[i].statusSelected = null
          })

          commit(types.REPLACE_LOADING_DASHBOARD_PURCHASES, { status: false })
          commit(types.REPLACE_DASHBOARD_PURCHASES, { purchases })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DASHBOARD_PURCHASES, { status: false })
          reject(error)
        })
    })
  },

  getDashboardUsers ({ commit }, payload) {
    commit(types.REPLACE_LOADING_DASHBOARD_USERS, { status: true })

    return new Promise((resolve, reject) => {
      dashboardAPI.getUsers(payload)
        .then(response => {
          let users = response.data

          commit(types.REPLACE_LOADING_DASHBOARD_USERS, { status: false })
          commit(types.REPLACE_DASHBOARD_USERS, { users })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_DASHBOARD_USERS, { status: false })
          reject(error)
        })
    })
  }

}

export const mutations = {

  [types.REPLACE_DASHBOARD_PURCHASES] (state, { purchases }) {
    state.dashboardPurchases = purchases
  },
  [types.REPLACE_LOADING_DASHBOARD_PURCHASES] (state, { status }) {
    state.loadingDashboardPurchases = status
  },
  [types.REPLACE_DASHBOARD_USERS] (state, { users }) {
    state.dasboardUsers = users
  },
  [types.REPLACE_LOADING_DASHBOARD_USERS] (state, { status }) {
    state.loadingDasboardUsers = status
  }
}
