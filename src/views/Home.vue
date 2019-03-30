<template>
  <div>
    <Login />
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  metaInfo () {
    return { title: 'Inicio' }
  },

  components: {
    Login: () => import('@/components/Login.vue')
  },

  computed: {
  },

  created () {
  },

  methods: {
    ...mapActions({
    })
  }

}
</script>
