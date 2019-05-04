<template>
  <v-container
    fluid
    grid-list-lg
  >
    <!-- <NotPermission v-if="!$can('update', 'Profile')" /> -->
    <!-- <template v-else> -->
    <Breadcrumbs
      :routes="[
        { name: 'Inicio', to: { name: 'home' } },
        { name: 'Ventas ' },
      ]"
    />

    <v-card>
      <v-toolbar
        color="info"
        dark
        card
      >
        <v-toolbar-title>Ventas</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <FormSale />
      </v-card-text>
    </v-card>
    <!-- </template> -->
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    FormSale: () => import('@/components/FormSale')

  },

  data: () => ({

  }),

  metaInfo () {
    return { title: 'Ventas' }
  },

  computed: {
    ...mapState({
      //  showModalLogin: state => state.auth.showModalLogin,
    }),
    ...mapGetters({
      authenticated: 'auth/check'
    })

  },

  watch: {

  },

  created () {
    if (!this.$can('update', 'Profile')) return false
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
