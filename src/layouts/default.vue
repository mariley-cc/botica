<template>
  <v-app :dark="dark">
    <Toolbar />
    <NavigationDrawer v-if="$vuetify.breakpoint.smAndDown || authenticated" />

    <v-content>
      <transition
        name="page"
        mode="out-in"
      >
        <slot>
          <router-view :key="$route.fullPath" />
        </slot>
      </transition>
    </v-content>

    <ModalRegister />
    <ModalForgotPassword />
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    Toolbar: () => import('@/components/Toolbar.vue'),
    NavigationDrawer: () => import('@/components/NavigationDrawer.vue'),
    ModalRegister: () => import('@/components/ModalRegister.vue'),
    ModalForgotPassword: () => import('@/views/users/ModalForgotPassword.vue')
  },
  data: () => ({
    title: 'Welcome to GoPlay!'
  }),

  computed: {
    ...mapState({
      dark: state => state.layout.dark
    }),

    ...mapGetters({
      authenticated: 'auth/check',
      userIsAdmin: 'auth/userIsAdmin',
      userIsClient: 'auth/userIsClient'
    })
  },

  created () {
  },

  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss">
.v-btn__content {
  height: auto !important;
  width: auto !important;
}

// upload images
.avatar-uploader {
  padding-top: 7px;
  .el-upload {
    border: 3px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
    border-color: #409EFF;
    }
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: auto;
  max-width: 100%;
  max-height: 178px;
  display: block;
}
// end upload images

  .scoped-list-tile {
    a, .v-list__tile {
      padding-left: 1.5rem !important;
    }
  }

  .scoped-sidebar-list-group {
    &:before, &:after {
      background: transparent !important;
    }

    .v-list__group__header {
      border-radius: 8px !important;
      overflow: hidden !important;

      &:hover {
        background: #74ba1a !important;
      }
    }
  }

  .btn-special-purple {
    &:hover {
      background: white !important;
      color: #341069 !important;
    }
  }

  .btn-special-purple-reverse {
    color: #341069 !important;

    &:hover {
      background: #341069 !important;
      color: white !important;
    }
  }

  .btn-special-green {
    &:hover {
      background: white !important;
      color: #74ba1a !important;
    }
  }

  .btn-special-green-reverse {
    color: #74ba1a !important;

    &:hover {
      background: #74ba1a !important;
      color: white !important;
    }
  }

  .btn-special-error {
    &:hover {
      background: white !important;
      color: #FF5252 !important;
    }
  }

  .headline {
    font-size: 1.8em !important;
    font-weight: 300;
  }
  .display-3 {
    font-size: 4.5em !important;
  }
</style>
