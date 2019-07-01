export default [
  {
    path: '/',
    name: 'welcome',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/admision/admision.vue')
  }

]
