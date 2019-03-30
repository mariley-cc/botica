<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Dashboard')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Dashboard' },
        ]"
      />

      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Dashboard</v-toolbar-title>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <p>data</p>
        <!--  -->
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data: () => ({

  }),

  metaInfo () {
    return { title: 'Dashboard' }
  },

  computed: {
    ...mapState({
      //  showModalLogin: state => state.auth.showModalLogin,
    })

  },

  watch: {

  },

  created () {
    if (!this.$can('list', 'Dashboard')) return false
    // this.getPlans()
    // const url =
  },

  methods: {
    ...mapActions({
      // getPlans: 'plans/getPlans'
    })
  }
}
</script>

<style scoped>

</style>
