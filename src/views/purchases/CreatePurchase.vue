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
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
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
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.condition"
                        :disabled="processingForm"
                        label="Condición"
                        :error="!!formErrors.condition"
                        :error-messages="formErrors.condition"
                        @keyup="() => {
                          formErrors.condition = undefined
                          delete formErrors.condition
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
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
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-menu
                        v-model="form.targetPurchaseDate"
                        :close-on-content-click="false"
                        lazy
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          :value="formatDate(form.purchase_date)"
                          :rules="rules.purchase_date"
                          readonly
                          box
                          hint="Formato DD/MM/AAAA"
                          persistent-hint
                          label="Fecha de compra"
                          append-icon="event"
                        />
                        <v-date-picker
                          v-model="form.purchase_date"
                          locale="es-pe"
                          @input="form.targetPurchaseDate = false"
                        />
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-menu
                        v-model="form.targetExpirationDate"
                        :close-on-content-click="false"
                        lazy
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          :value="formatDate(form.expiration_date)"
                          :rules="rules.expiration_date"
                          readonly
                          box
                          hint="Formato DD/MM/AAAA"
                          persistent-hint
                          label="Fecha de expiracion de la compra"
                          append-icon="event"
                        />
                        <v-date-picker
                          v-model="form.expiration_date"
                          locale="es-pe"
                          @input="form.targetExpirationDate = false"
                        />
                      </v-menu>
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-menu
                        v-model="form.targetIssueDate"
                        :close-on-content-click="false"
                        lazy
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          :value="formatDate(form.issue_date)"
                          :rules="rules.issue_date"
                          readonly
                          box
                          hint="Formato DD/MM/AAAA"
                          persistent-hint
                          label="Fecha de Asunto"
                          append-icon="event"
                        />
                        <v-date-picker
                          v-model="form.issue_date"
                          locale="es-pe"
                          @input="form.targetIssueDate = false"
                        />
                      </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
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
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
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
                    </v-flex>
                  </v-layout>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex
                      sm6
                      xs12
                    >
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
                    </v-flex>
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
                  <v-flex
                    sm6
                    xs12
                  >
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
                  </v-flex>
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
    <DetailPurchase />
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
    NotPermission: () => import('@/views/errors/NotPermission'),
    DetailPurchase: () => import('@/views/purchases/DetailPurchase')
  },

  data () {
    return {
      targetPurchaseDate: false,
      targetIssueDate: false,
      targetExpirationDate: false,
      imageUrl: '',
      formErrors: {},
      form: {
        invoice: '',
        condition: 'contado',
        modality: 'efectivo',
        issue_date: '',
        expiration_date: '',
        purchase_date: '',
        advance: 0,
        total: 0,
        state: 'cancelado',
        observation: '',
        provider_id: 0
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
      loadingProviders: state => state.providers.loadingProviders
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

    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

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
