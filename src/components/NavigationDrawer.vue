<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    fixed
    dark
    style="background: black"
    app
    class="pa-4"
  >
    <v-list
      v-if="authenticated"
      class="mb-4 black"
    >
      <v-list-tile
        v-if="primaryDrawer.mini"
        color="yellow"
        class="pa-0"
        @click.stop="replacePrimaryDrawerMini"
      >
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile
        avatar
        tag="div"
      >
        <v-list-tile-avatar>
          <template v-if="user.wallet && user.wallet.image_path">
            <v-img
              :src="user.wallet.image_path"
              :lazy-src="user.wallet.image_path"
              contain
            >
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                />
              </v-layout>
            </v-img>
          </template>

          <template v-else>
            <v-icon class="grey darken-2">
              person
            </v-icon>
          </template>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action />
      </v-list-tile>
    </v-list>

    <v-list class="pt-0 black">
      <template v-if="showtoolbarITems">
        <v-list-tile
          v-for="(item, i) in toolbarItems"
          :key="i"
          exact
          color="white"
          active-class="accent"
          class="scoped-list-tile mb-1"
          :to="item.to"
        >
          <v-list-tile-action
            v-if="item.icon"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.name }}</v-list-tile-content>
        </v-list-tile>
      </template>
      <template v-if="user && user.user_type === 'client'">
        <v-list-group
          class="scoped-sidebar-list-group"
          no-action
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Mi cuenta</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="(item, i) in sidebarItems"
            :key="i"
            exact
            ripple
            color="white"
            active-class="accent"
            class="scoped-list-tile mb-1"
            :to="item.to"
            :disabled="!item.to"
          >
            <v-list-tile-action
              v-if="item.icon"
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </template>

      <template v-if="user && user.user_type === 'admin'">
        <v-list-tile
          v-for="(item, i) in sidebarItems"
          :key="i"
          exact
          ripple
          color="white"
          active-class="accent"
          class="scoped-list-tile mb-1"
          :to="item.to"
          :disabled="!item.to"
        >
          <v-list-tile-action
            v-if="item.icon"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <template>
        <v-list-tile
          v-if="!authenticated"
          color="white"
          active-class="accent"
          class="scoped-list-tile mb-1"
          @click="replaceShowModalLogin({ status: true })"
        >
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Iniciar sesión</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-else
          exact
          ripple
          color="white"
          active-class="accent"
          class="scoped-list-tile mb-1"
          @click="logout({ router: $router })"
        >
          <v-list-tile-action>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerrar sesión</v-list-tile-content>
        </v-list-tile>
      </template>
      <v-img
        :src="require('@/assets/logo_goplay.png')"
        :lazy-src="require('@/assets/logo_goplay.png')"
        contain
        max-height="31"
        class="mt-5"
      >
        <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-layout>
      </v-img>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      primaryDrawer: state => state.layout.primaryDrawer
    }),

    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
      sidebarItems: 'layout/sidebarItems',
      toolbarItems: 'layout/toolbarItems'
    }),

    showtoolbarITems: function () {
      if (this.$vuetify.breakpoint.width > 959) return false
      return !this.authenticated || this.user.user_type === 'client'
    }
  },

  methods: {
    ...mapActions({
      replacePrimaryDrawer: 'layout/replacePrimaryDrawer',
      replaceShowModalLogin: 'auth/replaceShowModalLogin',
      logout: 'auth/logout'
    }),

    replacePrimaryDrawerMini () {
      let primaryDrawer = this.primaryDrawer
      primaryDrawer.mini = !primaryDrawer.mini

      this.replacePrimaryDrawer({ primaryDrawer })
    }
  }
}
</script>

<style lang="scss" scoped>
.scoped-list-tile {
  border-radius: 8px !important;
  overflow: hidden !important;

  &:hover {
    background: #74ba1a !important;
  }
}

</style>
