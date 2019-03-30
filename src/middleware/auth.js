import store from '@/store/index'

export default async (to, from, next) => {
  if (!store.getters['auth/check']) {
    next({ name: 'home' })
  } else {
    next()
  }
}
