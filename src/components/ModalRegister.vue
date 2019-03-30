<template>
  <v-dialog
    v-model="showModalRegister"
    fullscreen
    transition="fade-transition"
    lazy
    dark
  >
    <v-card
      flat
      color="rgba(0, 0, 0, 0.9)"
    >
      <v-toolbar
        color="transparent"
        card
      >
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalRegister({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text
        class="pa-0"
        style="height: 100%"
      >
        <v-container
          fluid
          fill-height
        >
          <v-layout
            row
            wrap
            align-center
          >
            <v-flex
              xs12
              sm6
              md4
              offset-sm3
              offset-md4
            >
              <h2 class="display-2 text-xs-center mb-4">
                Regístrate
              </h2>

              <v-form
                v-model="validForm"
                lazy-validation
                class="font-weight-bold"
                @submit.prevent="lauchLogin"
              >
                <v-text-field
                  v-model="form.name"
                  dark
                  :disabled="processingForm"
                  :error="!!formErrors.name"
                  :error-messages="formErrors.name"
                  :rules="rules.name"
                  autofocus
                  color="white"
                  outline
                  prepend-inner-icon="person"
                  label="Nombre"
                  @keyup="() => {
                    formErrors.name = undefined
                    delete formErrors.name
                  }"
                />

                <v-text-field
                  v-model="form.email"
                  dark
                  :disabled="processingForm"
                  :error="!!formErrors.email"
                  :error-messages="formErrors.email"
                  :rules="rules.email"
                  color="white"
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
                  dark
                  :disabled="processingForm"
                  :error="!!formErrors.password"
                  :error-messages="formErrors.password"
                  :rules="rules.password"
                  color="white"
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
                  dark
                  :disabled="processingForm"
                  :error="!!formErrors.password_confirmation"
                  :error-messages="formErrors.password_confirmation"
                  :rules="rules.password_confirmation"
                  type="password"
                  color="white"
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
                    color="primary"
                    class="text-capitalize font-weight-bold subheading btn-special-purple"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Regístrarse
                  </v-btn>
                  <p class="font-weight-light mt-3">
                    Al hacer clic en régistrarse, acepta los Términos y Condiciones de Uso de Goplay.
                  </p>
                </div>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      validForm: true,
      processingForm: false,
      formErrors: {},
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        name: [
          v => !!v || 'El nombre es requerido'
        ],
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
    ...mapState({
      showModalRegister: state => state.viewModalsWeb.showModalRegister
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalRegister: 'viewModalsWeb/replaceShowModalRegister',
      userRegister: 'users/userRegister'
    }),

    lauchLogin () {
      this.processingForm = true

      this.userRegister({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalRegister({ status: false })
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
hr {
  border: 0px;
}
</style>
