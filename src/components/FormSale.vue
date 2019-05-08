<template>
  <div>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          v-if="user"
          sm6
          xs12
        >
          <v-text-field
            v-model="user.name"
            label="Usuario (vendedor)"
            readonly
            hide-details
          />
        </v-flex>
        <v-flex
          xs12
          sm6
          md4
        >
          <v-text-field
            v-model="form.date"
            label="Fecha actual"
            prepend-icon="event"
            readonly
            hide-details
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md4
        >
          <v-text-field
            v-model="form.invoice"
            label="Nro de Factura"
          />
        </v-flex>
      </v-layout>
      <v-divider class="pb-3" />
      <v-form
        ref="formDetailSale"
        v-model="validFormDetailSale"
        lazy-validation
        @submit.prevent="addDetailSale"
      >
        <v-layout
          row
          wrap
          justify-center
        >
          <v-flex
            md6
            sm6
            xs12
          >
            <v-autocomplete
              :items="detailProducts"
              :loading="loadingDetailProducts"
              :disabled="processingFormDetailSale"
              :item-text="item => `${item.bar} ${item.kairoProduct.name}`"
              dense
              return-object
              small-chips
              append-outer-icon="search"
              :rules="rules.product_id"
              clearable
              box
              label="Productos"
              @change="onChangeProduct"
            />
          </v-flex>
        </v-layout>
      </v-form>
      <v-divider />
      <v-data-table
        :headers="[
          { text: 'Producto', value: 'invoice' },
          { text: 'P.Unitario', value: 'condition' },
          { text: 'Cantidad', value: 'modality' },
          { text: 'Medida', value: 'modality' },
          { text: 'SubTotal', value: 'total' },
          { text: 'Acciones', value: '' },
        ]"
        :items="productSelected"
        class="elevation-1"
      >
        <tr
          slot="items"
          slot-scope="props"
        >
          <td>{{ props.item.kairoProduct.name }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.box }}</td>
          <td>{{ props.item.price * props.item.quantity }}</td>
          <td class="text-xs-right">
            <v-btn
              class="ma-0"
              small
              fab
              flat
              color="error"
              @click="removeDetailSale(props.item)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </v-data-table>
    </v-container>
    <v-divider class="mb-3" />
    <div class="text-xs-center pb-3">
      <v-btn
        type="submit"
        color="success"
        :disabled="!validForm || processingForm"
        :loading="processingForm"
      >
        Registrar Venta
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {
      menu2: false,

      form: {
        total: 0,
        date: new Date().toISOString().substr(0, 10),
        state: 'normal',
        invoice: '',
        user_id: 0
      },

      validForm: true,
      processingForm: false,

      productSelected: [],

      formDetailSale: {
        quantity: 0,
        price: '5',
        box: 'unidades',
        sale_id: 0,
        product_id: 1
      },

      validFormDetailSale: true,
      processingFormDetailSale: false,

      formErrors: {},

      salesDetail: [],

      rules: {
        quantity: [
          v => !!v || 'La cantidad es requerida'],
        price: [
          v => !!v || 'El precio es requerida'],
        box: [
          v => !!v || 'La medida es requerida'],
        product_id: [
          v => !!v || 'Seleccione un producto']
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      detailProducts: state => state.detailProducts.detailProducts,
      loadingDetailProducts: state => state.detailProducts.loadingDetailProducts
    })
  },

  created () {
    this.getDetailProducts()
  },

  methods: {
    ...mapActions({
      getDetailProducts: 'detailProducts/getDetailProducts',
      replaceShowModalDeleteProduct: 'products/replaceShowModalDeleteProduct',
      replaceCurrentProduct: 'products/replaceCurrentProduct',
      replaceProducts: 'products/replaceProducts'
    }),

    addDetailSale () {
      if (!this.$refs.formDetailSale.validate()) return false

      this.salesDetail.push(this.formDetailSale)

      this.formDetailSale.quantity = 1
      this.formDetailSale.price = ''
      this.formDetailSale.box = ''
      this.formDetailSale.sale_id = ''
      this.formDetailSale.product_id = ''
    },

    removeDetailSale (item) {
      const index = this.productSelected.indexOf(item)
      this.productSelected.splice(index, 1)
    },

    onChangeProduct (item) {
      if (!item) return false
      this.productSelected.push({
        quantity: 1,
        price: '5',
        box: 'unidades',

        ...item
      })
    }
  }

}
</script>
