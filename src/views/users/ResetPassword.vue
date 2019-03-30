<template>
  <v-container
    fluid
    grid-list-lg
  >
    <Breadcrumbs :routes="[{ name: 'Inicio', to: { name: 'home' } },{ name: 'Cambiar contraseña' }]" />

    <template>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          sm6
          md4
          offset-sm3
          offset-md4
        >
          <v-card>
            <v-card-text
              class="pa-0"
            >
              <v-container
                fluid
              >
                <h2 class="primary--text mb-2 text-xs-center font-weight-bold">
                  Cambia tu contraseña
                </h2>
                <v-divider
                  class="mb-4 mt-2 primary"
                />
                <v-form
                  v-model="validForm"
                  lazy-validation
                  class="font-weight-bold"
                  @submit.prevent="submitChangePassword"
                >
                  <v-text-field
                    v-model="form.email"
                    :disabled="processingForm"
                    :error="!!formErrors.email"
                    :error-messages="formErrors.email"
                    :rules="rules.email"
                    outline
                    prepend-inner-icon="email"
                    label="Correo electrónico"
                    @keyup="() => {
                      formErrors.email = undefined
                      delete formErrors.email
                    }"
                  />

                  <v-text-field
                    v-model="form.password"
                    :disabled="processingForm"
                    :error="!!formErrors.password"
                    :error-messages="formErrors.password"
                    :rules="rules.password"
                    outline
                    type="password"
                    prepend-inner-icon="lock"
                    label="Contraseña"
                    @keyup="() => {
                      formErrors.password = undefined
                      delete formErrors.password
                    }"
                  />

                  <v-text-field
                    v-model="form.password_confirmation"
                    :disabled="processingForm"
                    :error="!!formErrors.password_confirmation"
                    :error-messages="formErrors.password_confirmation"
                    :rules="rules.password_confirmation"
                    type="password"
                    outline
                    prepend-inner-icon="lock"
                    label="Repita su contraseña"
                    @keyup="() => {
                      formErrors.password_confirmation = undefined
                      delete formErrors.password_confirmation
                    }"
                  />

                  <div class="text-xs-center">
                    <v-btn
                      large
                      type="submit"
                      color="accent"
                      class="text-capitalize font-weight-bold subheading btn-special-green"
                      :disabled="!validForm || processingForm"
                      :loading="processingForm"
                    >
                      Cambiar Contraseña
                    </v-btn>
                  </div>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      validForm: true,
      processingForm: false,
      formErrors: {},
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      },
      rules: {
        email: [
          v => !!v || 'El correo electrónico es requerido',
          // eslint-disable-next-line no-useless-escape
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'El correo electrónico debe ser válido'
        ],
        password: [
          v => !!v || 'La contraseña es requerida'
        ],
        password_confirmation: [
          v => !!v || 'La  confirmación de la contraseña es requerida'
        ]
      }
    }
  },
  computed: {

  },

  created () {
    this.form.token = this.$route.params.token
  },

  methods: {
    ...mapActions({
      resetPassword: 'users/resetPassword'
    }),

    submitChangePassword () {
      this.processingForm = true

      this.resetPassword({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          this.processingForm = false

          this.formErrors = error.response.data.errors || {}
        })
    }
  }
}
</script>
<style scoped>
</style>
