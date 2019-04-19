export default [
  {
    path: '/',
    name: 'welcome',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  // sgc
  {
    path: '/sgc/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue')
  },

  // sgc users
  {
    path: '/sgc/users',
    name: 'sgcUsersList',
    component: () => import('@/views/users/ListUsers.vue')
  },
  {
    path: '/sgc/users/create',
    name: 'sgcUsersCreate',
    component: () => import('@/views/users/CreateUser.vue')
  },
  {
    path: '/sgc/users/:id',
    name: 'sgcUsersEdit',
    component: () => import('@/views/users/EditUser.vue')
  },
  {
    path: '/sgc/places',
    name: 'sgcPlacesList',
    component: () => import('@/views/places/ListPlaces.vue')
  },
  {
    path: '/sgc/products',
    name: 'sgcProductsList',
    component: () => import('@/views/products/ListProducts.vue')
  },
  {
    path: '/sgc/providers',
    name: 'sgcProvidersList',
    component: () => import('@/views/providers/ListProviders.vue')
  },
  {
    path: '/sgc/providers/create',
    name: 'sgcProvidersCreate',
    component: () => import('@/views/providers/CreateProvider.vue')
  },
  {
    path: '/sgc/providers/:id',
    name: 'sgcProvidersEdit',
    component: () => import('@/views/providers/EditProvider.vue')
  },
  {
    path: '/sgc/purchases',
    name: 'sgcPurchasesList',
    component: () => import('@/views/purchases/ListPurchases.vue')
  }
]
