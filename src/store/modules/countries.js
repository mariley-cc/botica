import * as types from '../mutation-types'
import countriesAPI from '@/api/country'

export const state = {
  countries: [],
  loadingCountries: false

}

export const actions = {
  getCountries ({ commit }, payload) {
    commit(types.REPLACE_LOADING_COUNTRIES, { status: true })

    return new Promise((resolve, reject) => {
      countriesAPI.get(payload)
        .then(response => {
          let countries = response.data.data

          commit(types.REPLACE_LOADING_COUNTRIES, { status: false })
          commit(types.REPLACE_COUNTRIES, { countries })

          resolve(response)
        })
        .catch(error => reject(error))
    })
  }
}

export const mutations = {
  [types.REPLACE_LOADING_COUNTRIES] (state, { status }) {
    state.loadingCountries = status
  },
  [types.REPLACE_COUNTRIES] (state, { countries }) {
    state.countries = countries
  }
}
