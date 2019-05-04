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
          sm6
          xs12
        >
          <v-autocomplete
            v-model="form.user_id"
            :items="[]"
            dense
            clearable
            small-chips
            label="Nombre/DNI de Usuario"
            item-text="type"
            item-value="id"
            :disabled="processingForm"
            :error="!!formErrors.user_id"
            :error-messages="formErrors.user_id"
            append-outer-icon="add_circle"
            @click:append-outer="{}"
            @change="() => {
              formErrors.user_id = undefined
              delete formErrors.user_id
            }"
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
            md3
            sm3
            xs12
          >
            <v-autocomplete
              v-model="formDetailSale.product_id"
              :items="products"
              :loading="loadingProducts"
              :disabled="processingFormDetailSale"
              item-text="name"
              item-value="product_id"
              dense
              small-chips
              :rules="rules.product_id"
              clearable
              box
              label="Productos"
            />
          </v-flex>
          <v-flex
            md3
            sm3
            xs12
          >
            <v-text-field
              v-model="formDetailSale.price"
              disabled

              box
              label="Precio"
            />
          </v-flex>
          <v-flex
            md3
            sm3
            xs12
          >
            <v-text-field
              v-model="formDetailSale.box"
              :disabled="processingFormDetailSale"
              box
              :rules="rules.box"
              label="Unidades"
            />
          </v-flex>
          <v-flex md1>
            <v-btn
              :disabled="!validFormDetailSale || processingFormDetailSale"
              :loading="processingFormDetailSale"
              type="submit"
              fab
              small
              color="success"
            >
              <v-icon>
                add
              </v-icon>
            </v-btn>
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
        :items="salesDetail"
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
          <td>{{ props.item.total }}</td>
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
      products: state => state.products.products,
      loadingProducts: state => state.products.loadingProducts
    })
  },

  created () {
    this.getProducts()
  },

  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
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
      console.log('remove')
    }
  }

}
</script>
