<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Sales')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Ventas', to: { name: 'sgcSalesList' } },
          { name: 'Nueva Venta' }
        ]"
      />

      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>Nueva Venta</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text
          class="pa-0"
        >
          <FormSale />
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Nueva Venta' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
    FormSale: () => import('@/components/FormSale')
  },

  computed: {
    ...mapState({
    })
  },

  created () {
    if (!this.$can('update', 'Sale')) return false

    this.getUser({ userId: this.$route.params.id })
  },

  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      replaceCurrentUser: 'users/replaceCurrentUser'
    })
  }

}
</script>
