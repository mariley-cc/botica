import * as types from '../mutation-types'

export const state = {
  showModalSubscription: false,
  showModalPurchaseService: false,
  showModalRegister: false,
  showModalForgotPassword: false

}

export const actions = {
  replaceShowModalSubscription ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_SUBSCRIPTION, payload)
  },

  replaceShowModalRegister ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_REGISTER, payload)
  },

  replaceShowModalPurchaseService ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_PURCHASE_SERVICE, payload)
  },

  replaceShowModalForgotPassword ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_FORGOT_PASSWORD, payload)
  }
}

export const mutations = {
  [types.REPLACE_SHOW_MODAL_SUBSCRIPTION] (state, { status }) {
    state.showModalSubscription = status
  },
  [types.REPLACE_SHOW_MODAL_REGISTER] (state, { status }) {
    state.showModalRegister = status
  },
  [types.REPLACE_SHOW_MODAL_PURCHASE_SERVICE] (state, { status }) {
    state.showModalPurchaseService = status
  },
  [types.REPLACE_SHOW_MODAL_FORGOT_PASSWORD] (state, { status }) {
    state.showModalForgotPassword = status
  }

}
