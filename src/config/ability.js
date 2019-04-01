import { AbilityBuilder } from '@casl/ability'

export const ability = AbilityBuilder.define((can, cannot) => {
  can(['test'], 'Banners')
})

export function defineAbilitiesFor (user = {}) {
  // const roleType = user.typeUser.name || 'guest'
  const roleType = user.typeUser.id === 1 ? 'seller' : 'admin'

  switch (roleType) {
    case 'admin':
      return [
        {
          subject: 'Dashboard',
          actions: ['list']
        },
        {
          subject: 'Places',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Purchases',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Products',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Boxes',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Sales',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Users',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Transfers',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Providers',
          actions: ['list', 'create', 'update', 'delete']
        }
      ]

    case 'seller':
      return [
        {
          subject: 'Purchases',
          actions: ['list', 'create', 'update', 'delete']
        },
        {
          subject: 'Places',
          actions: ['list', 'create', 'update', 'delete']
        }
      ]

    default:
      return []
  }
}
