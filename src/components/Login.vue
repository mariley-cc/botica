<template>
  <v-card
    dark
  >
    <v-toolbar
      color="transparent"
      card
    >
      <v-spacer />
      <v-btn
        icon
        dark
        @click="replaceShowModalLogin({ status: false })"
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
              Iniciar Sesión
            </h2>

            <v-form
              v-model="validForm"
              lazy-validation
              class="font-weight-bold"
              @submit.prevent="lauchLogin"
            >
              <v-text-field
                v-model="form.username"
                dark
                :disabled="processingForm"
                :error="!!validationErrors.username"
                :error-messages="validationErrors.username"
                autofocus
                color="white"
                outline
                prepend-inner-icon="email"
                label="Correo electrónico"
                @keyup="() => {
                  validationErrors.username = undefined
                  delete validationErrors.username
                }"
              />

              <v-text-field
                v-model="form.password"
                dark
                :disabled="processingForm"
                :error="!!validationErrors.password"
                :error-messages="validationErrors.password"
                type="password"
                color="white"
                outline
                prepend-inner-icon="lock"
                label="Contraseña"
                @keyup="() => {
                  validationErrors.password = undefined
                  delete validationErrors.password
                }"
              />

              <v-checkbox
                dark
                color="white"
                class="white--text ma-0"
                label="Recuérdame"
              />
              <div class="text-xs-center ">
                <v-btn
                  large
                  type="submit"
                  color="primary"
                  class="text-capitalize font-weight-bold subheading btn-special-purple"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Iniciar sesión
                </v-btn>
                <p>
                  <a
                    class="accent--text font-weight-bold"
                    @click="onLoadModalForgotPassword()"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </p>
              </div>
            </v-form>

            <div class="text-xs-center mt-4">
              <p class="white--text font-weight-bold">
                ¿Aún no tienes cuenta en GoPlay?
              </p>
              <v-btn
                large
                color="accent"
                class="text-capitalize font-weight-bold subheading btn-special-green"
                @click="onLoadModalRegister"
              >
                Regístrate
              </v-btn>
              <p class="white--text caption mt-3">
                Si haces clic en "Iniciar sesion con Facebook o Google" y no eres usuario de GoPlay, quedarás registrado y aceptarás los Términos y Condiciones y la Política de Privacidad de GoPlay.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  components: {
  },

  data () {
    return {
      tryFacebookLogin: false,
      validForm: true,
      processingForm: false,
      form: {
        username: 'mariley@idw.com.pe',
        password: '12345678'
      },
      validationErrors: {},
      remember: true,
      rules: {
        username: [
          v => !!v || 'El correo electrónico es requerido',
          // eslint-disable-next-line no-useless-escape
          v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'El correo electrónico debe ser válido'
        ],
        password: [
          v => !!v || 'La contraseña es requerida'
        ]
      }
    }
  },
  computed: {
    ...mapState({
      showModalLogin: state => state.auth.showModalLogin,
      primaryDrawer: state => state.layout.primaryDrawer
    })
  },

  watch: {
    showModalLogin (newValue, oldValue) {
      if (!newValue) {
        this.tryFacebookLogin = false
        return false
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalLogin: 'auth/replaceShowModalLogin',
      replaceShowModalRegister: 'viewModalsWeb/replaceShowModalRegister',
      replaceShowModalForgotPassword: 'viewModalsWeb/replaceShowModalForgotPassword',
      login: 'auth/login',
      replacePrimaryDrawer: 'layout/replacePrimaryDrawer'
    }),

    lauchLogin () {
      this.processingForm = true

      this.login({ params: this.form })
        .then(response => {
          // Save the token.
          this.$store.dispatch('auth/saveToken', {
            token: response.data.token,
            remember: this.remember
          })

          this.processingForm = false
          this.replaceShowModalLogin({ status: false })
          this.replacePrimaryDrawerModel()

          // Fetch the user.
          this.$store.dispatch('auth/fetchUser')
            .then(response => {
              this.processingForm = false

              const roleType = response.data.data.user_type
              if (roleType === 'admin') {
                this.$router.push({ name: 'dashboard' })
              } else {
                this.$router.push({ name: 'home' })
              }
            })
            .catch(error => {
              this.processingForm = false
              this.validationErrors = error.response.data.errors || {}
            })
        })
        .catch((error) => {
          this.processingForm = false
          this.validationErrors = error.response.data.errors || {}
        })
    },

    replacePrimaryDrawerModel () {
      let primaryDrawer = this.primaryDrawer
      primaryDrawer.model = true

      this.replacePrimaryDrawer({ primaryDrawer })
    },

    onLoadModalRegister () {
      this.replaceShowModalLogin({ status: false })
      this.replaceShowModalRegister({ status: true })
    },

    onLoadModalForgotPassword () {
      this.replaceShowModalLogin({ status: false })
      this.replaceShowModalForgotPassword({ status: true })
    }
  }
}
</script>
