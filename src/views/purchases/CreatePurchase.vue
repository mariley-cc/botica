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
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Compra</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreatePurchase"
              >
              <v-container
                  fluid
                  grid-list-lg
                >
                   <v-text-field
                    v-model="form.invoice"
                    :disabled="processingForm"
                    label="Codido de Factura"
                    :rules="rules.invoice"
                    :error="!!formErrors.invoice"
                    :error-messages="formErrors.invoice"
                    @keyup="() => {
                      formErrors.invoice = undefined
                      delete formErrors.invoice
                    }"
                  />
                  <v-text-field
                    v-model="form.condition"
                    :disabled="processingForm"
                    label="Condicion"
                    :rules="rules.condition"
                    :error="!!formErrors.condition"
                    :error-messages="formErrors.condition"
                    @keyup="() => {
                      formErrors.condition = undefined
                      delete formErrors.condition
                    }"
                  />
                  <v-text-field
                    v-model="form.modality"
                    :disabled="processingForm"
                    label="Modalidad de pago"
                    :error="!!formErrors.modality"
                    :error-messages="formErrors.modality"
                    @keyup="() => {
                      formErrors.modality = undefined
                      delete formErrors.modality
                    }"
                  />
                  <v-text-field
                    v-model="form.issue_date"
                    :disabled="processingForm"
                    label="fecha de compra"
                    :error="!!formErrors.issue_date"
                    :error-messages="formErrors.issue_date"
                    @keyup="() => {
                      formErrors.issue_date = undefined
                      delete formErrors.issue_date
                    }"
                  />
                  <v-text-field
                    v-model="form.expiration_date"
                    :disabled="processingForm"
                    label="fecha de vencimiento"
                    :error="!!formErrors.expiration_date"
                    :error-messages="formErrors.expiration_date"
                    @keyup="() => {
                      formErrors.expiration_date = undefined
                      delete formErrors.expiration_date
                    }"
                  />
                  <v-text-field
                    v-model="form.purchase_date"
                    :disabled="processingForm"
                    label="fecha de compras "
                    :error="!!formErrors.purchase_date"
                    :error-messages="formErrors.purchase_date"
                    @keyup="() => {
                      formErrors.purchase_date = undefined
                      delete formErrors.purchase_date
                    }"
                  />
                  <v-text-field
                    v-model="form.advance"
                    :disabled="processingForm"
                    label="advance"
                    :error="!!formErrors.advance"
                    :error-messages="formErrors.advance"
                    @keyup="() => {
                      formErrors.advance = undefined
                      delete formErrors.advance
                    }"
                  />
                  <v-text-field
                    v-model="form.total"
                    :disabled="processingForm"
                    label="total "
                    :error="!!formErrors.total"
                    :error-messages="formErrors.total"
                    @keyup="() => {
                      formErrors.total = undefined
                      delete formErrors.total
                    }"
                  />
                  <v-text-field
                    v-model="form.state"
                    :disabled="processingForm"
                    label="estado de la compra"
                    :error="!!formErrors.state"
                    :error-messages="formErrors.state"
                    @keyup="() => {
                      formErrors.state = undefined
                      delete formErrors.state
                    }"
                  />
                  <v-text-field
                    v-model="form.observation"
                    :disabled="processingForm"
                    label="observacion"
                    :error="!!formErrors.observation"
                    :error-messages="formErrors.observation"
                    @keyup="() => {
                      formErrors.observation = undefined
                      delete formErrors.observation
                    }"
                  />
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.provider_id"
                        :items="providers"
                        :loading="loadingProviders"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar Proveedor"
                        item-text="name"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.provider_id"
                        :error-messages="formErrors.provider_id"
                        @change="() => {
                          formErrors.provider_id = undefined
                          delete formErrors.provider_id
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
    return { title: 'Nueva Compra' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {
      imageUrl: '',
      formErrors: {},

      form: {
        invoice: '',
        condition: 'contado',
        modality: 'deposito',
        issue_date: 0,
        expiration_date: 0,
        purchase_date: 0,
        advance: 0,
        total: 0,
        state:'cancelado',
        observation: '',
        provider_id:0
      },

      validForm: true,
      processingForm: false,

      rules: {
        invoice: [
          v => !!v || 'El codigo de barras es requerido'
        ],
        condition: [
          v => !!v || 'El condicion es requerido'
        ],
        modality: [
          v => !!v || 'El grupo es requerida'
        ],
        provider_id: [
          v => !!v || 'El grupo es requerida'
        ]
      }
    }
  },

  computed: {
    ...mapState({
      currentPurchase: state => state.purchases.currentPurchase,
      providers: state => state.providers.providers,
      loadingProviders: state => state.providers.loadingProviders,
    })
  },

  created () {
    if (!this.$can('create', 'Purchases')) return false
    this.getProviders()
  },

  methods: {
    ...mapActions({
      replaceCurrentPurchase: 'purchases/replaceCurrentPurchase',
      createPurchase: 'purchases/createPurchase',
      getProviders: 'providers/getProviders',
      getPurchases: 'purchases/getPurchases'

    }),

    submitCreatePurchase () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createPurchase({ data: this.form })
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
