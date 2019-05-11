<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Purchases')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Purchases', to: { name : 'sgcPurchasesList' } },
          { name: 'Nueva Compra' }
        ]"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          sm12
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Detalle de la compra</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateDetailPurchase"
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
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.concept"
                        :disabled="processingForm"
                        label="Concepto"
                        :error="!!formErrors.concept"
                        :error-messages="formErrors.concept"
                        @keyup="() => {
                          formErrors.concept = undefined
                          delete formErrors.concept
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.quantity"
                        :disabled="processingForm"
                        label="Cantidad"
                        :error="!!formErrors.quantity"
                        :error-messages="formErrors.quantity"
                        @keyup="() => {
                          formErrors.quantity = undefined
                          delete formErrors.quantity
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm4
                      xs12
                    >
                      <v-text-field
                        v-model="form.lot"
                        :disabled="processingForm"
                        label="Lote"
                        :error="!!formErrors.lot"
                        :error-messages="formErrors.lot"
                        @keyup="() => {
                          formErrors.lot = undefined
                          delete formErrors.lot
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.cost"
                        :disabled="processingForm"
                        label="Costo"
                        :error="!!formErrors.cost"
                        :error-messages="formErrors.cost"
                        @keyup="() => {
                          formErrors.cost = undefined
                          delete formErrors.cost
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-text-field
                        v-model="form.payment"
                        :disabled="processingForm"
                        label="Pago"
                        :error="!!formErrors.payment"
                        :error-messages="formErrors.payment"
                        @keyup="() => {
                          formErrors.payment = undefined
                          delete formErrors.payment
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.product_id"
                        :items="products"
                        :loading="loadingProducts"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar Producto"
                        item-text="bar"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.product_id"
                        :error-messages="formErrors.product_id"
                        @change="() => {
                          formErrors.product_id = undefined
                          delete formErrors.product_id
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm3
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.purchase_id"
                        :items="purchases"
                        :loading="loadingPurchases"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar Compra"
                        item-text="invoice"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.purchase_id"
                        :error-messages="formErrors.purchase_id"
                        @change="() => {
                          formErrors.purchase_id = undefined
                          delete formErrors.purchase_id
                        }"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ condition: 'sgcProvidersList' })">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Nueva Detalle Compra' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {
      formErrors: {},
      form: {
        concept: '',
        quantity: 0,
        cost: 0,
        payment: '',
        lot: '',
        product_id: 0,
        purchase_id: 0
      },
      validForm: true,
      processingForm: false,

      rules: {
        concept: [
          v => !!v || 'El codigo de barras es requerido'
        ],
        modality: [
          v => !!v || 'El grupo es requerida'
        ],
        product_id: [
          v => !!v || 'El grupo es requerida'
        ]
      }
    }
  },

  computed: {
    ...mapState({
      currentPurchase: state => state.purchases.currentPurchase,
      products: state => state.products.products,
      loadingProducts: state => state.products.loadingProducts,
      purchases: state => state.purchases.purchases,
      loadingPurchases: state => state.purchases.loadingPurchases
    })
  },

  created () {
    this.getPurchases()
    this.getProducts()
  },

  methods: {
    ...mapActions({
      replaceCurrentPurchase: 'purchases/replaceCurrentPurchase',
      createDetailPurchases: 'detailPurchases/createDetailPurchases',
      getProducts: 'products/getProducts',
      getPurchases: 'purchases/getPurchases'
    }),

    submitCreateDetailPurchase () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createDetailPurchases({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ condition: 'sgcPurchaseList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
