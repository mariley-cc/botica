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
          { name: 'Editar usuario' }
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
          v-if="currentUser"
          class="pa-0"
        >
          <template v-if="currentUser.user_type === 'admin'">
            <FormUpdateUserAdmin />
          </template>
          <template v-else>
            <FormUpdateUserClient />
          </template>
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
    return { title: 'Editar Usuario' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
    FormUpdateUserAdmin: () => import('@/components/user/FormUpdateUserAdmin'),
    FormUpdateUserClient: () => import('@/components/user/FormUpdateUserClient')
  },

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },

  created () {
    if (!this.$can('update', 'Users')) return false

    // this.getUser({ userId: this.$route.params.id })
  },

  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      replaceCurrentUser: 'users/replaceCurrentUser'
    })
  }

}
</script>
