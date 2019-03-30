export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Home.vue')
  },

  // sgc
  {
    path: '/sgc/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue')
  },

  // sgc user
  {
    path: '/profile/password-reset/:token',
    name: 'sgcPasswordReset',
    component: () => import('@/views/users/ResetPassword.vue')
  },
  {
    path: '/sgc/user/profile',
    name: 'sgcProfile',
    component: () => import('@/views/users/Profile.vue')
  },

  // sgc users
  {
    path: '/sgc/users',
    name: 'sgcUsersList',
    component: () => import('@/views/users/ListUsers.vue')
  },
  {
    path: '/sgc/users/:id',
    name: 'sgcUsersEdit',
    component: () => import('@/views/users/EditUser.vue')
  }

]
