<template>
  <v-container
    fluid
    grid-list-lg
  >
    <template v-if="!authenticated">
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
            <v-card-title
              class="text-xs-center primary white--text title"
              primary-title
            >
              <v-spacer />
              <span>
                Iniciar Sesión
              </span>
              <v-spacer />
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                v-model="validForm"
                lazy-validation
                @submit.prevent="lauchLogin"
              >
                <v-container
                  fluid
                  class="pb-0"
                  grid-list-lg
                >
                  <v-text-field
                    v-model="form.username"
                    :disabled="processingForm"
                    :error="!!validationErrors.username"
                    :error-messages="validationErrors.username"
                    autofocus
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
                    :disabled="processingForm"
                    :error="!!validationErrors.password"
                    :error-messages="validationErrors.password"
                    type="password"
                    outline
                    prepend-inner-icon="lock"
                    label="Contraseña"
                    @keyup="() => {
                      validationErrors.password = undefined
                      delete validationErrors.password
                    }"
                  />
                </v-container>
                <v-divider />
                <v-container
                  fluid
                  grid-list-lg
                >
                  <div class="text-xs-center ">
                    <v-btn
                      type="submit"
                      color="primary"
                      :disabled="!validForm || processingForm"
                      :loading="processingForm"
                    >
                      Iniciar sesión
                    </v-btn>
                    <p class="mb-0">
                      <a>
                        ¿Olvidaste tu contraseña?
                      </a>
                    </p>
                  </div>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
        password: '123456'
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
    }),

    ...mapGetters({
      authenticated: 'auth/check'
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

  created () {
    if (this.authenticated) this.$router.push({ name: 'home' })
  },

  methods: {
    ...mapActions({
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
    }
  }
}
</script>
