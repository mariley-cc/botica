<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Users', to: { name: 'sgcUsersList' } },
          { name: 'Nuevo usuario' }
        ]"
      />

      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Editar Usuario</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text
          class="pa-0"
        >
          <v-form>
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
                    v-model="form.username"
                    box
                    label="Nombre de Usuario"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-text-field
                    v-model="form.email"
                    box
                    label="Email"
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
                    v-model="form.name"
                    box
                    label="Nombre"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-text-field
                    v-model="form.last_name"
                    box
                    label="Apellidos"
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
                    v-model="form.dni"
                    box
                    label="N° de DNI"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-text-field
                    v-model="form.telephone"
                    box
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
                  <v-text-field
                    v-model="form.password"
                    box
                    label="Contraseña"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-text-field
                    v-model="form.password2"
                    box
                    label="Repetir Contraseña"
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
                    :items="[]"
                    box
                    dense
                    deletable-chips
                    multiple
                    small-chips
                    label="Seleccionar tipo de usuario"
                    item-text="name"
                    item-value="id"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-autocomplete
                    v-model="form.place_id"
                    :items="[]"
                    box
                    dense
                    deletable-chips
                    multiple
                    small-chips
                    label="Seleccionar lugar de Trabajo"
                    item-text="name"
                    item-value="id"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
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
      }
    }
  },

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },

  created () {
    if (!this.$can('update', 'Users')) return false
  },

  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      replaceCurrentUser: 'users/replaceCurrentUser'
    })
  }

}
</script>
