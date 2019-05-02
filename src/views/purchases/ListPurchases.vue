<template>
  <v-container
    fluid
    grid-list-lg
  >
    <!-- <NotPermission v-if="!$can('list', 'Users')" /> -->

    <!-- <template v-else> -->
    <Breadcrumbs
      :routes="[
        { name: 'Inicio', to: { name: 'home' } },
        { name: 'Compras' },
        { name: 'Listado' }
      ]"
    />
    <v-card>
      <v-toolbar
        color="grey darken-4"
        dark
        card
      >
        <v-toolbar-title>Compras</v-toolbar-title>
        <v-spacer />
          <v-btn
            :to="{ name: 'sgcPurchasesCreate' }"
            color="success"
          >
            Registrar Compra
          </v-btn>
      </v-toolbar>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            v-if="purchases.length"
            sm6
          >
            <v-text-field
              v-model="searchPurchases"
              :disabled="loadingPurchases"
              box
              append-icon="search"
              label="Buscar"
              clearable
              hide-details
            />
          </v-flex>
          <v-flex xs12>
            <v-data-table
              :headers="[
                { text: 'Factura', value: 'invoice' },
                { text: 'Condicion', value: 'condition' },
                { text: 'Modalidad', value: 'modality' },
                { text: 'Total', value: 'total' },
                { text: 'Estado', value: 'state' },
                { text: 'Proveedor', value: 'provider.name' },
              ]"
              :items="purchases"
              :search="searchPurchases"
              :loading="loadingPurchases"
              class="elevation-1"
            >
              <tr
                slot="items"
                slot-scope="props"
              >
                <td>{{ props.item.invoice }}</td>
                <td>{{ props.item.condition }}</td>
                <td>{{ props.item.modality }}</td>
                <td>{{ props.item.total }}</td>
                <td>{{ props.item.state }}</td>
                <td>{{ props.item.provider.name }}</td>
                <td class="text-xs-right">
                  <template v-if="$can('update', 'Purchases')">
                    <v-btn
                      class="ma-0"
                      :to="{ name: 'sgcPurchasesEdit', params: { id: props.item.id } }"
                      small
                      fab
                      flat
                      color="info"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </template>

                  <v-btn
                    v-if="$can('delete', 'Purchases')"
                    class="ma-0"
                    small
                    fab
                    flat
                    color="error"
                    @click="openModalDeletePurchase(props.item)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <ModalDeletePurchase />
    <!-- </template> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de compras' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ModalDeletePurchase: () => import('@/views/purchases/ModalDeletePurchase')
  },

  data () {
    return {
      searchPurchases: ''
    }
  },

  computed: {
    ...mapState({
      purchases: state => state.purchases.purchases,
      loadingPurchases: state => state.purchases.loadingPurchases
    })
  },

  created () {
    this.getPurchases()
  },

  methods: {
    ...mapActions({
      getPurchases: 'purchases/getPurchases',
      replaceShowModalDeletePurchase: 'purchases/replaceShowModalDeletePurchase',
      replaceCurrentPurchase: 'purchases/replaceCurrentPurchase',
      replacePurchases: 'purchases/replacePurchases'
    }),

    openModalDeletePurchase (purchase) {
      this.replaceCurrentPurchase({ purchase })
      this.replaceShowModalDeletePurchase({ status: true })
    }
  }
}
</script>

<style scoped>

</style>
