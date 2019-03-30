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
  toolbarItems: (state, getters, rootState, rootGetters) => {
    let items = [
      {
        name: 'Inicio',
        to: { name: 'home' }
      }
    ]

    const plans = rootGetters['plans/plansForToolbar']

    plans.forEach(element => {
      items.push({
        name: element.name,
        to: { name: 'plan', params: { slug: element.tag } }
      })
    })

    if (rootGetters['auth/userIsClient']) {
      items.push(
        {
          name: 'Créditos',
          to: { name: 'credits' }
        }
      )

      return items
    }

    return items
  },

  sidebarItems: (state, getters, rootState, rootGetters) => {
    let items = []

    if (rootGetters['auth/userIsClient']) {
      items.push(
        {
          name: 'Perfil',
          // to: { name: 'sgcProfile' },
          icon: 'person'
        },
        {
          name: 'GoPlay',
          // to: { name: 'sgcUserGameRoom' },
          icon: 'videogame_asset'
        },
        {
          name: 'Notificaciones',
          // to: { name: 'sgcUserNotifications' },
          icon: 'notifications'
        },
        {
          name: 'Salon de Apuestas',
          // to: { name: 'sgcUserBettingRoom' },
          icon: 'details'
        },
        {
          name: 'Monedero',
          // to: { name: 'sgcUserCoinPurse' },
          icon: 'attach_money'
        },
        {
          name: 'Subscripción',
          // to: { name: 'sgcUserSubscriptions' },
          icon: 'credit_card'
        },
        {
          name: 'Estadísticas',
          // to: { name: 'sgcUserStatistics' },
          icon: 'timeline'
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
          name: 'Banners'
          // to: { name: 'sgcBannersList' }
        },
        {
          name: 'Planes'
          // to: { name: 'sgcPlansList' }
        },
        {
          name: 'Servicios'
          // to: { name: 'sgcServicesList' }
        },
        {
          name: 'Movimientos de créditos'
          // to: { name: 'sgcCreditMovements' }
        },
        {
          name: 'Apuestas'
          // to: { name: 'sgcPurchasesList' }
        },
        {
          name: 'Usuarios',
          to: { name: 'sgcUsersList' }
        },
        {
          // to: { name: 'sgcNotificationsCreate' },
          name: 'Notificaciones'
        },
        {
          // to: { name: 'sgcConfigurations' },
          name: 'Configuración'
        }
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
