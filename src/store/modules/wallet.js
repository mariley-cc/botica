import * as types from '../mutation-types'
import walletAPI from '@/api/wallet'

export const state = {
  transactions: [],
  loadingTransactions: false
}

export const actions = {

  getTransactions ({ commit }, payload) {
    commit(types.REPLACE_LOADING_TRANSACTIONS, { status: true })

    return new Promise((resolve, reject) => {
      walletAPI.getTransactions(payload)
        .then(response => {
          let transactions = response.data.data

          commit(types.REPLACE_LOADING_TRANSACTIONS, { status: false })
          commit(types.REPLACE_TRANSACTIONS, { transactions })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_TRANSACTIONS, { status: false })
          reject(error)
        })
    })
  },

  addOrReduceCredits ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      walletAPI.putCredits(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updateStateWallet ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      walletAPI.putStateWallet(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'El estado de Monedero ha sido actualizado con éxito.'
          })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

}

export const mutations = {
  [types.REPLACE_TRANSACTIONS] (state, { transactions }) {
    state.transactions = transactions
  },
  [types.REPLACE_LOADING_TRANSACTIONS] (state, { status }) {
    state.loadingCredits = status
  }
}
