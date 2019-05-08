<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Sales')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Registra tu Venta ' },
        ]"
      />

      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>Nueva Venta</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-0">
          <FormSale />
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
    ...mapGetters({
      authenticated: 'auth/check'
    })

  },

  watch: {

  },

  created () {
    if (!this.$can('create', 'Sales')) return false
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style scoped>

</style>
