import * as types from '../mutation-types'
import placeAPI from '@/api/place'

export const state = {
  places: [],
  loadingPlaces: false
}

export const actions = {
  getPlaces ({ commit }, payload) {
    commit(types.REPLACE_LOADING_PLACES, { status: true })

    return new Promise((resolve, reject) => {
      placeAPI.get(payload)
        .then(response => {
          const places = response.data.data

          commit(types.REPLACE_LOADING_PLACES, { status: false })
          commit(types.REPLACE_PLACES, { places })

          resolve(response)
        })
        .catch(error => {
          commit(types.REPLACE_LOADING_PLACES, { status: false })
          reject(error)
        })
    })
  },

  createPlace ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      placeAPI.post(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El Lugar ha sido agregado con éxito.'
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updatePlace ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      placeAPI.put(payload)
        .then(response => {
          this._vm.$notify.success({
            title: 'Botica',
            message: 'El usuario ha sido actualizado con éxito.'
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
  [types.REPLACE_LOADING_PLACES] (state, { status }) {
    state.loadingPlaces = status
  },
  [types.REPLACE_PLACES] (state, { places }) {
    state.places = places
  }
}
