<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Products')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Productos' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'sgcProductsCreate' }"
            color="success"
          >
            Agregar Producto
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
            <v-flex sm6 />
            <v-flex
              v-if="products.length"
              sm6
            >
              <v-text-field
                v-model="searchProducts"
                :disabled="loadingProducts"
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
                  { text: 'bar', value: 'bar' },
                  { text: 'Stock', value: 'stock' },
                  { text: 'Condición', value: 'condition' },
                  { text: 'Grupo', value: 'grouped' }
                ]"
                :items="products"
                :search="searchProducts"
                :loading="loadingProducts"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td>{{ props.item.bar }}</td>
                  <td>{{ props.item.stock }}</td>
                  <td>{{ props.item.condition }}</td>
                  <td>{{ props.item.grouped }}</td>
                  <td class="text-xs-right">
                    <template v-if="$can('update', 'Products')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'sgcProductsEdit', params: { id: props.item.id } }"
                        small
                        fab
                        flat
                        color="info"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </template>

                    <v-btn
                      v-if="$can('delete', 'Products')"
                      class="ma-0"
                      small
                      fab
                      flat
                      color="error"
                      @click="openModalDeleteProduct(props.item)"
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
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de Products' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      searchProducts: '',
      radioFilterBy: ''
    }
  },

  computed: {
    ...mapState({
      products: state => state.products.products,
      loadingProducts: state => state.products.loadingProducts
    })
  },

  created () {
    if (!this.$can('list', 'Products')) return false

    this.getProducts()
  },

  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
      replaceShowModalDeleteProduct: 'products/replaceShowModalDeleteProduct',
      replaceCurrentProduct: 'products/replaceCurrentProduct',
      replaceProducts: 'products/replaceProducts'
    })
  }
}
</script>

<style scoped>

</style>
