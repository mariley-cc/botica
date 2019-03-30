<template>
  <v-dialog
    v-model="showModalForgotPassword"
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
          @click="replaceShowModalForgotPassword({ status: false })"
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
                Restablecer Contraseña
              </h2>

              <v-form
                v-model="validForm"
                lazy-validation
                class="font-weight-bold"
                @submit.prevent="submitTokenforResetPassword"
              >
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

                <div class="text-xs-center">
                  <v-btn
                    large
                    type="submit"
                    color="accent"
                    class="text-capitalize font-weight-bold subheading btn-special-green"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Restablecer contraseña
                  </v-btn>
                  <p class="font-weight-light mt-3">
                    Ya tienes Cuenta y contraseña
                    <a
                      class="accent--text font-weight-bold"
                      @click="onLoadModalLogin"
                    > Inicia Sesión</a>
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
        email: ''
      },
      rules: {
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
      showModalForgotPassword: state => state.viewModalsWeb.showModalForgotPassword
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalForgotPassword: 'viewModalsWeb/replaceShowModalForgotPassword',
      replaceShowModalLogin: 'auth/replaceShowModalLogin',
      sendTokenForResetPassword: 'users/sendTokenForResetPassword'
    }),

    submitTokenforResetPassword () {
      console.log('reset Token')
      this.processingForm = true

      this.sendTokenForResetPassword({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalForgotPassword({ status: false })
        })
        .catch(error => {
          this.processingForm = false

          this.formErrors = error.response.data.errors || {}
        })
    },

    onLoadModalLogin () {
      this.replaceShowModalForgotPassword({ status: false })
      this.replaceShowModalLogin({ status: true })
    }
  }
}
</script>

<style scoped>
hr {
  border: 0px;
}
</style>
