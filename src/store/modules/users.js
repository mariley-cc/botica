import * as types from '../mutation-types'
import userAPI from '@/api/user'

export const state = {
  users: [],
  loadingUsers: false,
  showModalDeleteUser: false,
  currentUser: null,
  loadingCurrentUser: false
}

export const actions = {
  userRegister ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.register(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'El usuario ha sido registrado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getUsers ({ commit }, payload) {
    commit(types.REPLACE_LOADING_USERS, { status: true })

    return new Promise((resolve, reject) => {
      userAPI.get(payload)
        .then(response => {
          const users = response.data.data

          commit(types.REPLACE_LOADING_USERS, { status: false })
          commit(types.REPLACE_USERS, { users })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_USERS, { status: false })
          reject(error)
        })
    })
  },

  replaceShowModalDeleteUser ({ commit }, payload) {
    commit(types.REPLACE_SHOW_MODAL_DELETE_USER, payload)
  },

  replacePurchasesByUser ({ commit }, payload) {
    commit(types.REPLACE_PURCHASES_BY_USER, payload)
  },

  deleteUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.delete(payload)
        .then(response => {
          commit(types.REPLACE_CURRENT_USER, { user: null })

          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'El usuario ha sido eliminado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  replaceUsers ({ commit }, payload) {
    commit(types.REPLACE_USERS, payload)
  },

  replaceCurrentUser ({ commit }, payload) {
    commit(types.REPLACE_CURRENT_USER, payload)
  },

  getUser ({ commit }, payload) {
    commit(types.REPLACE_LOADING_CURRENT_USER, { status: true })
    commit(types.REPLACE_CURRENT_USER, { user: null })

    return new Promise((resolve, reject) => {
      userAPI.getById(payload)
        .then(response => {
          const user = response.data.data

          commit(types.REPLACE_LOADING_CURRENT_USER, { status: false })
          commit(types.REPLACE_CURRENT_USER, { user })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_CURRENT_USER, { status: false })

          reject(error)
        })
    })
  },

  updateUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'El usuario ha sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateStateUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.updateState(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'El estado de cuenta ha sido actualizado con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUserAsClient ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.updateClient(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'los datos del cliente han sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUserAsAdmin ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Sus datos han sido actualizado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updatePasswordAsAdmin ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.updatePassword(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Su contraseña han sido actualizada con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  sendTokenForResetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.sendTokenForResetPassword(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Le hemos enviado un correo de cambio de contraseña!'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  resetPassword ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      userAPI.resetPassword(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'GoPlay',
            message: 'Su contraseña han sido actualizada con éxito.'
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}

export const mutations = {
  [types.REPLACE_LOADING_USERS] (state, { status }) {
    state.loadingUsers = status
  },
  [types.REPLACE_USERS] (state, { users }) {
    state.users = users
  },
  [types.REPLACE_SHOW_MODAL_DELETE_USER] (state, { status }) {
    state.showModalDeleteUser = status
  },
  [types.REPLACE_CURRENT_USER] (state, { user }) {
    state.currentUser = user
  },
  [types.REPLACE_LOADING_CURRENT_USER] (state, { status }) {
    state.loadingCurrentUser = status
  }
}
