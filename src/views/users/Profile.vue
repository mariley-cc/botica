<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Profile')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Home', to: { name: 'home' } },
          { name: 'Perfil' }
        ]"
      />

      <v-card>
        <v-card-title primary-title>
          <span class="pl-2 black--text font-weight-bold headline">
            Mi Perfil
          </span>
          <v-spacer />
          <v-switch
            v-model="activeAccount"
            color="success"
            hide-details
            readonly
            class="mt-0"
            style="max-width: 250px;"
            :label="`Cuenta: ${ activeAccount ? 'Activa' : 'Inactiva' }`"
          />
        </v-card-title>
        <v-divider
          style="border-width: 1px;"
          color="purple"
        />
        <v-tabs
          v-model="tab"
          color="white"
          centered
          class="my-3"
        >
          <v-tabs-slider
            color="black"
            style="height: 5px"
          />
          <v-tab class="black--text">
            Actualizar Perfil
          </v-tab>
          <v-tab class="black--text">
            Cambiar contraseña
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <template v-if="userIsAdmin">
              <FormUpdateProfileAdmin />
            </template>
            <template v-else>
              <FormUpdateProfileClient />
            </template>
          </v-tab-item>

          <v-tab-item>
            <FormUpdatePassword />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Mi perfil' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
    FormUpdateProfileAdmin: () => import('@/components/profile/FormUpdateProfileAdmin'),
    FormUpdateProfileClient: () => import('@/components/profile/FormUpdateProfileClient'),
    FormUpdatePassword: () => import('@/components/profile/FormUpdatePassword')
  },

  data () {
    return {
      tab: 0,
      activeAccount: false
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
    }),

    ...mapGetters({
      userIsAdmin: 'auth/userIsAdmin',
      walletIsActive: 'auth/walletIsActive',
      userIsActive: 'auth/userIsActive'
    })
  },

  created () {
    this.activeAccount = this.walletIsActive && this.userIsActive
  },

  methods: {
    ...mapActions({
      replaceShowModalIncreaseDecreaseCredits: 'credits/replaceShowModalIncreaseDecreaseCredits'
    })
  }
}
</script>
<style scoped>

</style>
