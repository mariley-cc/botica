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
  }

]
