<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Providers')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Proveedores', to: { name: 'sgcProvidersList' } },
          { name: 'Editar Proveedor' }
        ]"
      />
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
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Provedor</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateProvider"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <v-text-field
                    v-model="form.name"
                    :disabled="processingForm"
                    label="Nombre / Razon Social"
                    :error="!!formErrors.name"
                    :error-messages="formErrors.name"
                    @keyup="() => {
                      formErrors.name = undefined
                      delete formErrors.name
                    }"
                  />
                  <v-text-field
                    v-model="form.ruc"
                    :disabled="processingForm"
                    label="R.U.C."
                    :error="!!formErrors.ruc"
                    :error-messages="formErrors.ruc"
                    @keyup="() => {
                      formErrors.ruc = undefined
                      delete formErrors.ruc
                    }"
                  />
                  <v-text-field
                    v-model="form.account"
                    :disabled="processingForm"
                    label="Cuenta"
                    :error="!!formErrors.account"
                    :error-messages="formErrors.account"
                    @keyup="() => {
                      formErrors.account = undefined
                      delete formErrors.account
                    }"
                  />
                  <v-text-field
                    v-model="form.address"
                    :disabled="processingForm"
                    label="Dirección"
                    :error="!!formErrors.address"
                    :error-messages="formErrors.address"
                    @keyup="() => {
                      formErrors.address = undefined
                      delete formErrors.address
                    }"
                  />
                  <v-text-field
                    v-model="form.email"
                    :disabled="processingForm"
                    :rules="rules.email"
                    label="Correo Electrónico"
                    :error="!!formErrors.email"
                    :error-messages="formErrors.email"
                    @keyup="() => {
                      formErrors.email = undefined
                      delete formErrors.email
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
                      <v-text-field
                        v-model="form.mobile"
                        :disabled="processingForm"
                        label="Telefono"
                        mask="########"
                        return-masked-value
                        :error="!!formErrors.mobile"
                        :error-messages="formErrors.mobile"
                        @keyup="() => {
                          formErrors.mobile = undefined
                          delete formErrors.mobile
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.telephone"
                        :disabled="processingForm"
                        label="Celular"
                        :error="!!formErrors.telephone"
                        :error-messages="formErrors.telephone"
                        @keyup="() => {
                          formErrors.telephone = undefined
                          delete formErrors.telephone
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
                        v-model="form.contact"
                        :disabled="processingForm"
                        label="Contacto"
                        :rules="rules.contact"
                        :error="!!formErrors.contact"
                        :error-messages="formErrors.contact"
                        @keyup="() => {
                          formErrors.contact = undefined
                          delete formErrors.contact
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.type_provider_id"
                        :items="[]"
                        dense
                        clearable
                        small-chips
                        label="Tipo de proveedor"
                        item-text="type"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.type_provider_id"
                        :error-messages="formErrors.type_provider_id"
                        append-outer-icon="add_circle"
                        @click:append-outer="{}"
                        @change="() => {
                          formErrors.type_provider_id = undefined
                          delete formErrors.type_provider_id
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
                  <v-btn @click="$router.push({ name: 'sgcProvidersList' })">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <ModalCreatePlace />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Nuevo Usuario' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
    ModalCreatePlace: () => import('@/views/places/ModalCreatePlace')
  },

  data () {
    return {
      imageUrl: '',
      formErrors: {},

      form: {
        name: '',
        ruc: '',
        telephone: '',
        mobile: '',
        address: '',
        account: '',
        email: '',
        contact: '',
        type_provider_id: 0
      },

      validForm: true,
      processingForm: false,

      rules: {
        name: [
          v => !!v || 'El nombre es requerido'
        ],
        email: [
          v => !!v || 'El correo electrónico es requerido',
          // eslint-disable-next-line no-useless-escape
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'El correo electrónico debe ser válido'
        ]
      }
    }
  },

  computed: {
    ...mapState({
    })
  },

  created () {
    if (!this.$can('update', 'Providers')) return false
  },

  methods: {
    ...mapActions({
      createProvider: 'providers/createProvider',
      getProviders: 'providers/getProviders',
      getProvider: 'providers/getProvider'
    }),

    submitCreateProvider () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createProvider({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'sgcProvidersList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }
}
</script>
