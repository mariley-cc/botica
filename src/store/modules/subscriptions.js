import * as types from '../mutation-types'
import subscriptionAPI from '@/api/subscription'

export const state = {
  subscriptionNotCurrent: [],
  loadingSubscriptionNotCurrent: false,
  subscriptionCurrent: null,
  loadingSubscriptionCurrent: false

}

export const actions = {
  getSubscriptionsNotCurrent ({ commit }, payload) {
    commit(types.REPLACE_LOADING_SUBSCRIPTIONS_NOT_CURRENT, { status: true })

    return new Promise((resolve, reject) => {
      subscriptionAPI.getNotCurrent(payload)
        .then(response => {
          let subscription = response.data.data

          commit(types.REPLACE_LOADING_SUBSCRIPTIONS_NOT_CURRENT, { status: false })
          commit(types.REPLACE_SUBSCRIPTIONS_NOT_CURRENT, { subscription })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_SUBSCRIPTIONS_NOT_CURRENT, { status: false })
          reject(error)
        })
    })
  },

  getSubscriptionCurrent ({ commit }, payload) {
    commit(types.REPLACE_LOADING_SUBSCRIPTIONS_CURRENT, { status: true })

    return new Promise((resolve, reject) => {
      subscriptionAPI.getCurrent(payload)
        .then(response => {
          let subscription = response.data.data[0] || null

          commit(types.REPLACE_LOADING_SUBSCRIPTIONS_CURRENT, { status: false })
          commit(types.REPLACE_SUBSCRIPTION_CURRENT, { subscription })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_SUBSCRIPTIONS_CURRENT, { status: false })
          reject(error)
        })
    })
  },

  createSubscription ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      subscriptionAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'La Subcripción se realizo con éxito.'
          })
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }

}

export const mutations = {
  [types.REPLACE_SUBSCRIPTIONS_NOT_CURRENT] (state, { subscription }) {
    state.subscriptionNotCurrent = subscription
  },
  [types.REPLACE_LOADING_SUBSCRIPTIONS_NOT_CURRENT] (state, { status }) {
    state.loadingSubscriptionNotCurrent = status
  },
  [types.REPLACE_SUBSCRIPTION_CURRENT] (state, { subscription }) {
    state.subscriptionCurrent = subscription
  },
  [types.REPLACE_LOADING_SUBSCRIPTIONS_CURRENT] (state, { status }) {
    state.loadingSubscriptionCurrent = status
  }
}
