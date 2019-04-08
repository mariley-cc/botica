<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Users')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Usuarios' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex sm6>
              <v-radio-group
                v-model="radioFilterBy"
                row
              >
                <v-radio
                  label="Ver todos"
                  value=""
                />
                <v-radio
                  label="Ver administradores"
                  value="admin"
                />
                <v-radio
                  label="ver clientes"
                  value="client"
                />
              </v-radio-group>
            </v-flex>
            <v-flex
              v-if="users.length"
              sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingUsers"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre', value: 'name' },
                  { text: 'Correo electrónico', value: 'email' },
                  { text: 'Tipo', value: 'user_type' },
                  { text: 'Activo', value: 'is_active' },
                  { text: 'Plan', value: 'plan.name' },
                  { text: 'Créditos', value: '' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="users"
                :search="searchUsers"
                :loading="loadingUsers"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>
                    <v-chip
                      v-if="props.item.user_type === 'admin'"
                      small
                      color="primary"
                      text-color="white"
                    >
                      {{ props.item.user_type }}
                    </v-chip>
                    <v-chip
                      v-else-if="props.item.user_type === 'client'"
                      small
                    >
                      Cliente
                    </v-chip>
                    <v-chip
                      v-else
                      small
                    >
                      ---
                    </v-chip>
                  </td>
                  <td>
                    <v-chip
                      v-if="props.item.user_type === 'client'"
                      dark
                      :color="verifyUserAndWalletIsActive(props.item) ? 'success' : 'error'"
                      small
                    >
                      {{ verifyUserAndWalletIsActive(props.item)? 'Si' : 'No' }}
                    </v-chip>
                  </td>
                  <td>
                    <span v-if="props.item.wallet">{{ props.item.wallet.plan ? props.item.wallet.plan.name : '' }}</span>
                  </td>
                  <td>
                    <span v-if="props.item.wallet">{{ parseFloat(props.item.wallet.amount_credits) }}</span>
                  </td>
                  <td class="text-xs-right">
                    <template v-if="$can('update', 'Users')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'sgcUsersEdit', params: { id: props.item.id } }"
                        small
                        fab
                        flat
                        color="info"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>

                      <v-tooltip
                        v-if="props.item.user_type === 'client'"
                        bottom
                      >
                        <v-btn
                          slot="activator"
                          class="ma-0"
                          small
                          fab
                          flat
                          color="success"
                          @click="openModalIncreaseDecreaseCreditsForUser(props.item)"
                        >
                          <v-icon>attach_money</v-icon>
                        </v-btn>
                        <span>Aumentar ó Reducir créditos</span>
                      </v-tooltip>
                    </template>

                    <v-btn
                      v-if="$can('delete', 'Users')"
                      class="ma-0"
                      small
                      fab
                      flat
                      color="error"
                      @click="openModalDeleteUser(props.item)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de Usuarios' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      searchUsers: '',
      radioFilterBy: ''
    }
  },

  computed: {
    ...mapState({
      users: state => state.users.users,
      loadingUsers: state => state.users.loadingUsers
    })
  },

  watch: {
    radioFilterBy (newValue, oldValue) {
      if (newValue === 'admin') {
        this.getUsers({ params: { type: 'admin' } })
      } else if (newValue === 'client') {
        this.getUsers({ params: { type: 'client' } })
      } else {
        this.getUsers()
      }
    }
  },

  created () {
    // if (!this.$can('list', 'Users')) return false

    this.getUsers()
  },

  methods: {
    ...mapActions({
      getUsers: 'users/getUsers',
      replaceShowModalDeleteUser: 'users/replaceShowModalDeleteUser',
      replaceShowModalIncreaseDecreaseCredits: 'credits/replaceShowModalIncreaseDecreaseCredits',
      replaceCurrentUser: 'users/replaceCurrentUser',
      replaceUsers: 'users/replaceUsers'
    }),

    openModalIncreaseDecreaseCreditsForUser (user) {
      this.replaceCurrentUser({ user })
      this.replaceShowModalIncreaseDecreaseCredits({ status: true })
    },

    openModalDeleteUser (user) {
      this.replaceCurrentUser({ user })
      this.replaceShowModalDeleteUser({ status: true })
    },

    verifyUserAndWalletIsActive (item) {
      return item.is_active === 'Si' && item.wallet.state === 'active'
    }
  }
}
</script>

<style scoped>

</style>
