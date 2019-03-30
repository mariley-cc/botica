import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define((can, cannot) => {
  can(['test'], 'Banners')
})

export function defineAbilitiesFor (user = {}) {
  const roleType = user.user_type || 'guest'

  switch (roleType) {
    case 'admin':
      return [
        {
          subject: 'Dashboard',
          actions: ['list']
        },
        {
          subject: 'Banners',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Plans',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Services',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'CreditMovements',
          actions: ['list', 'update', 'delete']
        },
        {
          subject: 'Purchases',
          actions: ['list', 'update', 'delete']
        },
        {
          subject: 'Users',
          actions: ['list', 'update', 'delete']
        },
        {
          subject: 'Notifications',
          actions: ['create']
        },
        {
          subject: 'Configurations',
          actions: ['update']
        },
        {
          subject: 'Profile',
          actions: ['update']
        }
      ]

    case 'client':
      return [
        {
          subject: 'Profile',
          actions: ['update']
        },
        {
          subject: 'GameRoom',
          actions: ['update']
        },
        {
          subject: 'CoinPurse',
          actions: ['list', 'update']
        },
        {
          subject: 'Notifications',
          actions: ['list']
        },
        {
          subject: 'Subscription',
          actions: ['list', 'update']
        },
        {
          subject: 'Bet',
          actions: ['list', 'create']
        },
        {
          subject: 'Statistics',
          actions: ['list']
        }
      ]

    default:
      return []
  }
}
