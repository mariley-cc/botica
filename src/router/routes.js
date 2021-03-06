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
    path: '/sgc/products/create',
    name: 'sgcProductsCreate',
    component: () => import('@/views/products/CreateProduct.vue')
  },
  {
    path: '/sgc/products/:id',
    name: 'sgcProductsEdit',
    component: () => import('@/views/products/EditProduct.vue')
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
  },
  {
    path: '/sgc/purchases/create',
    name: 'sgcPurchasesCreate',
    component: () => import('@/views/purchases/CreatePurchase.vue')
  },
  {
    path: '/sgc/purchases/:id',
    name: 'sgcPurchasesEdit',
    component: () => import('@/views/purchases/EditPurchase.vue')
  },
  {
    path: '/sgc/sales',
    name: 'sgcSalesList',
    component: () => import('@/views/sales/ListSales.vue')
  },
  {
    path: '/sgc/sales/create',
    name: 'sgcSalesCreate',
    component: () => import('@/views/sales/CreateSale.vue')
  },
  {
    path: '/sgc/kairos',
    name: 'sgcKairos',
    component: () => import('@/views/kairos/Index.vue')
  }
]
