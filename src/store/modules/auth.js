import Cookies from 'js-cookie'
import * as types from '../mutation-types'
import userAPI from '@/api/user'
import { ability, defineAbilitiesFor } from '@/config/ability'

export const state = {
  user: null,
  token: Cookies.get('token')
}

export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null,

  userIsAdmin: (state, getters, rootState, rootGetters) => {
    return state.user && state.user.user_type === 'admin'
  },

  userIsClient: (state, getters, rootState, rootGetters) => {
    return state.user && state.user.typeUser
  }
}

export const actions = {

  saveToken ({ commit }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  fetchUser ({ commit, state }) {
    return new Promise((resolve, reject) => {
      userAPI.user()
        .then(response => {
          const user = response.data.data
          commit(types.FETCH_USER_SUCCESS, { user })

          const newAbilities = defineAbilitiesFor(user)
          ability.update(newAbilities)

          resolve(response)
        })
        .catch(error => {
          commit(types.FETCH_USER_FAILURE)
          reject(error)
        })
    })
  },

  login ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.login(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Bienvenido'
          })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },

  logout ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.logout()
        .then(response => {
          commit(types.LOGOUT)

          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Hasta luego'
          })

          resolve(response)

          payload.router.push({ name: 'home' })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },
  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
  }
}
