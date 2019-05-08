<template>
  <div>
    <v-form
      ref="formSale"
      v-model="validForm"
      lazy-validation
      @submit.prevent="submitCreateSale"
    >
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
              :rules="rules.invoice"
            />
          </v-flex>
        </v-layout>
        <v-divider class="pb-3" />

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
              :item-text="item => `${item.product.bar} ${item.product.kairoProduct.name}`"
              dense
              return-object
              small-chips
              append-outer-icon="search"
              clearable
              box
              label="Productos"
              @change="onChangeProduct"
            />
          </v-flex>
        </v-layout>
        <v-divider />
        <v-data-table
          :headers="[
            { text: 'Tipo', value: '', sortable:false },
            { text: 'Descripción', value: '', sortable:false },
            { text: 'Lote/Vencimiento', value: '', sortable:false },
            { text: 'Cantidad ', value: '', sortable:false },
            { text: 'P.Unitario', value: '', sortable:false },
            { text: 'P.Total', value: '', sortable:false },
            { text: 'Eliminar', value: '', sortable:false, class:['px-1'] },
          ]"
          :items="productSelected"
          class="elevation-1"
        >
          <template
            slot="items"
            slot-scope="props"
          >
            <tr>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.item.box"
                  lazy
                  @save="save"
                  @cancel="cancel"
                >
                  {{ props.item.box }}
                  <template v-slot:input>
                    <v-autocomplete
                      slot="input"
                      v-model="props.item.box"
                      style="max-width: 120px"
                      :items="types"
                      hide-no-data
                      item-text="short_name"
                      item-value="value"
                      dense
                      small-chips
                      label="Tipo"
                      persistent-hint
                      hint="ENTER para Guardar"
                    />
                  </template>
                </v-edit-dialog>
              </td>
              <td editable>
                {{ props.item.product.kairoProduct.name }}
              </td>
              <td>
                <!-- <v-edit-dialog
              :return-value.sync="props.item.lot_id"
              lazy
              @save="save"
              @cancel="cancel"
            > -->
                {{ props.item.detailPurchase.lot }}
                <!-- <template v-slot:input>
                <v-autocomplete
                  slot="input"
                  v-model="props.item.lot_id"
                  style="max-width: 120px"
                  :items="lots"
                  hide-no-data
                  item-text="value"
                  item-value="id"
                  dense
                  small-chips
                  label="Tipo"
                  persistent-hint
                  hint="ENTER para Guardar"
                />
              </template>
            </v-edit-dialog> -->
              </td>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.item.quantity"
                  lazy
                  @save="save"
                  @cancel="cancel"
                >
                  {{ props.item.quantity }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="props.item.quantity"
                      label="Cantidad"
                      type="number"
                      :min="1"
                      style="max-width: 120px"
                      persistent-hint
                      hint="ENTER para Guardar"
                    />
                  </template>
                </v-edit-dialog>
              </td>
              <td>{{ props.item.detailPurchase.cost }}</td>
              <td>{{ props.item.detailPurchase.cost * props.item.quantity }}</td>
              <td class="text-xs-center px-1">
                <v-btn
                  class="ma-0"
                  small
                  fab
                  flat
                  color="error"
                  @click="removeDetailSale(props.item)"
                >
                  <v-icon small>
                    delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
          <template v-slot:footer>
            <tr class="font-weight-bold">
              <td
                colspan="5"
                class="text-xs-right"
              >
                Total:
              </td>
              <td
                colspan="2"
                class="text-xs-center"
              >
                {{ totalOfSale }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
      <v-divider class="mb-3" />
      <div class="text-xs-center pb-3">
        <v-btn
          type="submit"
          color="success"
          :disabled="!validForm || processingForm || !productSelected.length"
          :loading="processingForm"
        >
          Registrar Venta
        </v-btn>
      </div>
    </v-form>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}
      <v-btn
        flat
        @click="snack = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {

      snack: false,
      snackColor: '',
      snackText: '',

      types: [
        { value: 'unidades', short_name: 'Unid.' },
        { value: 'caja', short_name: 'Caj.' }
      ],

      lots: [
        { id: '1', value: '12345', short_name: 'lote_1' },
        { id: '2', value: '12322', short_name: 'lote_2' }
      ],

      form: {
        total: 0,
        date: new Date().toISOString().substr(0, 10),
        state: 'normal',
        invoice: '',
        user_id: ''
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
        invoice: [
          v => !!v || 'Este campo es requerido'],
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
    }),

    totalOfSale: function () {
      let total = 0
      this.productSelected.forEach(item => {
        item.price = item.detailPurchase.cost * item.quantity
        total += item.price
      })

      return total
    }
  },

  created () {
    this.getDetailProducts()
    this.form.user_id = this.user.id
  },

  methods: {
    ...mapActions({
      getDetailProducts: 'detailProducts/getDetailProducts',
      replaceShowModalDeleteProduct: 'products/replaceShowModalDeleteProduct',
      replaceCurrentProduct: 'products/replaceCurrentProduct',
      replaceProducts: 'products/replaceProducts',
      getDetailPurchases: 'detailPurchases/getDetailPurchases',
      saleSave: 'sales/saleSave',
      createDetailSale: 'detailSales/saleSave'
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
      /*
      {
        box: 'unidades',
        product_id: 1
        lote_id: 0,
        unit_price: 0,
        quantity: 0,
        price: '5',
      }
      */

      if (!item) return false
      this.productSelected.push({
        quantity: 1,
        price: item.detailPurchase.cost,
        box: 'unidades',
        product_id: item.product.id,

        ...item
      })
    },

    submitCreateSale () {
      if (!this.$refs.formSale.validate()) return false

      this.form.total = this.totalOfSale

      this.saleSave({ data: this.form })
        .then(response => {
          console.log(response)
        })
    },

    save () {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Data saved'
    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    }
  }

}
</script>
