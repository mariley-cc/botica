<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Sales')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Ventas' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          card
          color="info"
          dark
        >
          <v-toolbar-title>Ventas</v-toolbar-title>
          <v-spacer />
          <v-btn
            color="success"
            :to="{ name: 'sgcSalesCreate' }"
          >
            Nueva Venta
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
              v-if="sales.length"
              sm6
            >
              <v-text-field
                v-model="searchSales"
                :disabled="loadingSales"
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
                :items="sales"
                :search="searchSales"
                :loading="loadingSales"
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
                    <template v-if="$can('update', 'Sales')">
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
                      v-if="$can('delete', 'Sales')"
                      class="ma-0"
                      small
                      fab
                      flat
                      color="error"
                      @click="openModalDeleteSale(props.item)"
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
    </template>
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
      searchSales: ''
    }
  },

  computed: {
    ...mapState({
      sales: state => state.sales.sales,
      loadingSales: state => state.sales.loadingSales
    })
  },

  created () {
    this.getSales()
  },

  methods: {
    ...mapActions({
      getSales: 'sales/getSales',
      replaceShowModalDeletePurchase: 'purchases/replaceShowModalDeletePurchase',
      replaceCurrentPurchase: 'purchases/replaceCurrentPurchase',
      replacePurchases: 'purchases/replacePurchases'
    }),

    openModalDeleteSale (purchase) {
      this.replaceCurrentPurchase({ purchase })
      this.replaceShowModalDeletePurchase({ status: true })
    }
  }
}
</script>

<style scoped>

</style>
