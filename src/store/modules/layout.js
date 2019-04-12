import * as types from '../mutation-types'

export const state = {
  dark: false,
  primaryDrawer: {
    model: false,
    type: 'default',
    clipped: false,
    floating: false,
    mini: false
  },
  footer: {
    inset: true
  }
}

export const getters = {
  sidebarItems: (state, getters, rootState, rootGetters) => {
    let items = []

    if (rootGetters['auth/userIsClient']) {
      items.push(
        {
          name: 'Inicio',
          to: { name: 'home' },
          icon: 'home'
        },
        {
          name: 'Perfil',
          // to: { name: 'sgcUserGameRoom' },
          icon: 'person'
        },
        {
          name: 'Places',
          // to: { name: 'sgcUserGameRoom' },
          icon: 'person'
        },
        {
          name: 'Perfil',
          // to: { name: 'sgcUserGameRoom' },
          icon: 'person'
        }

      )

      return items
    }

    if (rootGetters['auth/userIsAdmin']) {
      items.push(
        {
          name: 'Inicio',
          to: { name: 'dashboard' }
        },
        {
          name: 'Personal',
          to: { name: 'sgcUsersList' }
        },
        {
          name: 'Boticas'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Proveedores'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Compras'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Ventas'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Productos',
          to: { name: 'sgcProductsList' },
        },
        {
          name: 'Revista Kairos'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Almacen'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Balance Diario'
          // to: { name: 'sgcUserGameRoom' },
        },
        {
          name: 'Reportes'
          // to: { name: 'sgcUserGameRoom' },
        },
      )

      return items
    }

    return items
  }
}

export const actions = {
  replacePrimaryDrawer ({ commit }, payload) {
    commit(types.REPLACE_PRIMARY_DRAWER, payload)
  }
}

export const mutations = {
  [types.REPLACE_PRIMARY_DRAWER] (state, { primaryDrawer }) {
    if (primaryDrawer.model) {
      state.primaryDrawer.model = primaryDrawer.model
    }
    if (primaryDrawer.type) {
      state.primaryDrawer.type = primaryDrawer.type
    }
    if (primaryDrawer.clipped) {
      state.primaryDrawer.clipped = primaryDrawer.clipped
    }
    if (primaryDrawer.floating) {
      state.primaryDrawer.floating = primaryDrawer.floating
    }
    if (primaryDrawer.mini) {
      state.primaryDrawer.mini = primaryDrawer.mini
    }
  }
}
