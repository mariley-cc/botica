<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Users', to: { name: 'sgcUsersList' } },
          { name: 'Nuevo usuario' }
        ]"
      />
      <v-layout
        row
        wrap
        justify-center
      >
        <v-flex
          md6
          sm5
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="info--text font-weight-bold headline">Registrar Usuario</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateUser"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <v-text-field
                    v-model="form.username"
                    label="Nombre de Usuario"
                  />
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                  />
                  <v-text-field
                    v-model="form.name"
                    label="Nombre"
                  />
                  <v-text-field
                    v-model="form.last_name"
                    label="Apellidos"
                  />
                  <v-text-field
                    v-model="form.password"
                    type="password"
                    label="Contraseña"
                    :rules="rules.password"
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
                        v-model="form.dni"
                        label="N° de DNI"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.telephone"
                        label="Celular"
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
                      <v-autocomplete
                        v-model="form.type_user_id"
                        :items="typeUsers"
                        :loading="loadingTipeUsers"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar tipo de usuario"
                        item-text="type"
                        item-value="id"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.place_id"
                        :items="places"
                        :loading="loadingPlaces"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar lugar de Trabajo"
                        item-text="name"
                        item-value="id"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center mb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ name: 'sgcUsersList' })">
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
    return { title: 'Nuevo Usuario' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {
      form: {
        email: 'user@example.com',
        username: 'string',
        password: 'string',
        last_name: 'string',
        name: 'string',
        dni: '12345678',
        telephone: '+51 931245657',
        image: 'string',
        image_path: 'string',
        state: 'activo',
        type_user_id: 0,
        place_id: 0
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
      currentUser: state => state.users.currentUser,
      places: state => state.places.places,
      loadingPlaces: state => state.places.loadingPlaces,
      typeUsers: state => state.typeUsers.typeUsers,
      loadingTipeUsers: state => state.typeUsers.loadingTipeUsers
    })
  },

  created () {
    if (!this.$can('create', 'Users')) return false
    this.getTypeUsers()
    this.getPlaces()
  },

  methods: {
    ...mapActions({
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      createUser: 'users/createUser',
      getPlaces: 'places/getPlaces'
    }),

    submitCreateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createUser({ data: this.form })
        .then(response => {
          this.processingForm = false
        })
        .catch(() => {
          this.processingForm = false
        })
    }
  }

}
</script>
