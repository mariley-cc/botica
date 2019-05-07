<template>
  <div>
    <v-toolbar
      flat
      color="white"
    >
      <v-toolbar-title>Kairo Producto</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer />

      <template>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="replaceShowModalCreateKairoProduct({ status:true})"
        >
          Agregar Nuevo
        </v-btn>
      </template>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="kairoproducts"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td
          class="text-xs-right"
        >
          {{ props.item.state }}
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="onLoadModalEdit(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <ModalCreateKairoProduct />
    <ModalEditKairoProduct />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    ModalCreateKairoProduct: () => import('@/views/kairos/products/ModalCreateKairoProducts'),
    ModalEditKairoProduct: () => import('@/views/kairos/products/ModalEditKairoProducts')
  },

  data: () => ({
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Estado', value: 'state' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      state: 'activo'
    },
    defaultItem: {
      name: '',
      state: 'activo'
    }
  }),
  computed: {
    ...mapState({
      kairoproducts: state => state.KairoProducts.kairoproducts,
      loadingKairoProducts: state => state.KairoProducts.loadingKairoProducts
    })
  },

  created () {
    this.getKairoProducts()
  },

  methods: {
    ...mapActions({
      replaceShowModalEditKairoProduct: 'KairoProducts/replaceShowModalEditKairoProduct',
      replaceShowModalCreateKairoProduct: 'KairoProducts/replaceShowModalCreateKairoProduct',
      replaceCurrentKairoProduct: 'KairoProducts/replaceCurrentKairoProduct',
      getKairoProducts: 'KairoProducts/getKairoProducts'
    }),
    onLoadModalEdit (kairoproduct) {
      this.replaceCurrentKairoProduct({ kairoproduct })
      this.replaceShowModalEditKairoProduct({ status: true })
    }
  }
}
</script>
