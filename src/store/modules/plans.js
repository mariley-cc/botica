import * as types from '../mutation-types'
import planAPI from '@/api/plan'

export const state = {
  plans: [],
  loadingPlans: false,
  plansForMemberships: [],
  loadingPlansForMemberships: false,
  currentPlan: null,
  loadingCurrentPlan: false,

  // web
  planSelected: null
}

export const getters = {
  plansForToolbar: (state, rootState) => {
    return state.plansForMemberships.filter(val => val.navbar) || []
  }
}

export const actions = {
  getPlans ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PLANS, { status: true })

    return new Promise((resolve, reject) => {
      planAPI.get(payload)
        .then(response => {
          let plans = response.data.data

          commit(types.REPLACE_LOADING_PLANS, { status: false })
          commit(types.REPLACE_PLANS, { plans })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getPlansForMemberships ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PLANS_FOR_MEMBERSHIPS, { status: true })

    return new Promise((resolve, reject) => {
      planAPI.get(payload)
        .then(response => {
          let plans = response.data.data

          commit(types.REPLACE_LOADING_PLANS_FOR_MEMBERSHIPS, { status: false })
          commit(types.REPLACE_PLANS_FOR_MEMBERSHIPS, { plans })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getPlan ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: true })
    commit(types.REPLACE_CURRENT_PLAN, { plan: null })

    return new Promise((resolve, reject) => {
      planAPI.getById(payload)
        .then(response => {
          const plan = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: false })
          commit(types.REPLACE_CURRENT_PLAN, { plan })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: false })

          reject(error)
        })
    })
  },

  uploadPlanImage ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      planAPI.uploadImage(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getPlanBySlug ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: true })
    commit(types.REPLACE_CURRENT_PLAN, { plan: null })

    return new Promise((resolve, reject) => {
      planAPI.getBySlug(payload)
        .then(response => {
          const plan = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: false })
          commit(types.REPLACE_CURRENT_PLAN, { plan })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_PLAN, { status: false })

          reject(error)
        })
    })
  },

  createPlan ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      planAPI.post(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  updatePlan ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      planAPI.put(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  deletePlan ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      planAPI.delete(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  getServicesByPlan ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      planAPI.getServices(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  replacePlanSelected ({ commit }, payload) {
    commit(types.REPLACE_PLAN_SELECTED, payload)
  }
}

export const mutations = {
  [types.REPLACE_LOADING_PLANS] (state, { status }) {
    state.loadingPlans = status
  },
  [types.REPLACE_PLANS] (state, { plans }) {
    state.plans = plans
  },
  [types.REPLACE_LOADING_PLANS_FOR_MEMBERSHIPS] (state, { status }) {
    state.loadingPlansForMemberships = status
  },
  [types.REPLACE_PLANS_FOR_MEMBERSHIPS] (state, { plans }) {
    state.plansForMemberships = plans
  },
  [types.REPLACE_LOADING_CURRENT_PLAN] (state, { status }) {
    state.loadingCurrentPlan = status
  },
  [types.REPLACE_CURRENT_PLAN] (state, { plan }) {
    state.currentPlan = plan
  },

  [types.REPLACE_PLAN_SELECTED] (state, { plan }) {
    state.planSelected = plan
  }
}
