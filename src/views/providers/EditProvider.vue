<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Providers')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Providers', to: { name: 'sgcProvidersList' } },
          { name: 'Editar Proveedor' }
        ]"
      />

      <v-card>
        <v-card-title
          primary-title
          class="py-2"
        >
          <span class="success--text font-weight-bold headline">Editar Provider</span>
        </v-card-title>
        <v-divider />
        <v-card-text
          class="pa-0"
        >
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
            @submit.prevent="submitUpdateProvider"
          >
            <v-container
              fluid
              grid-list-lg
            >
              <v-text-field
                v-model="form.username"
                :disabled="processingForm"
                label="Nombre de Usuario"
                :error="!!formErrors.username"
                :error-messages="formErrors.username"
                @keyup="() => {
                  formErrors.username = undefined
                  delete formErrors.username
                }"
              />
              <v-text-field
                v-model="form.email"
                :disabled="processingForm"
                label="Email"
                :rules="rules.email"
                :error="!!formErrors.email"
                :error-messages="formErrors.email"
                @keyup="() => {
                  formErrors.email = undefined
                  delete formErrors.email
                }"
              />
              <v-text-field
                v-model="form.name"
                :disabled="processingForm"
                label="Nombre"
                :error="!!formErrors.name"
                :error-messages="formErrors.name"
                @keyup="() => {
                  formErrors.name = undefined
                  delete formErrors.name
                }"
              />
              <v-text-field
                v-model="form.last_name"
                :disabled="processingForm"
                label="Apellidos"
                :error="!!formErrors.last_name"
                :error-messages="formErrors.last_name"
                @keyup="() => {
                  formErrors.last_name = undefined
                  delete formErrors.last_name
                }"
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
                    :disabled="processingForm"
                    label="N° de DNI"
                    mask="########"
                    return-masked-value
                    :error="!!formErrors.dni"
                    :error-messages="formErrors.dni"
                    @keyup="() => {
                      formErrors.dni = undefined
                      delete formErrors.dni
                    }"
                  />
                </v-flex>
                <v-flex
                  sm6
                  xs12
                >
                  <v-text-field
                    v-model="form.telephone"
                    :disabled="processingForm"
                    label="Celular"
                    :error="!!formErrors.telephone"
                    :error-messages="formErrors.telephone"
                    @keyup="() => {
                      formErrors.telephone = undefined
                      delete formErrors.telephone
                    }"
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
                    :disabled="processingForm"
                    :error="!!formErrors.type_user_id"
                    :error-messages="formErrors.type_user_id"
                    @change="() => {
                      formErrors.type_user_id = undefined
                      delete formErrors.type_user_id
                    }"
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
                    :disabled="processingForm"
                    :error="!!formErrors.place_id"
                    :error-messages="formErrors.place_id"
                    append-outer-icon="add_circle"
                    @click:append-outer="replaceShowModalCreatePlace({ status: true })"
                    @change="() => {
                      formErrors.place_id = undefined
                      delete formErrors.place_id
                    }"
                  />
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider class="mb-3" />
            <div class="text-xs-center pb-3">
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
    </template>

    <ModalCreatePlace />
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
    ModalCreatePlace: () => import('@/views/places/ModalCreatePlace')
  },

  data () {
    return {

      imageUrl: '',

      formErrors: {},

      form: {
        name: '',
        ruc: '',
        telephone: '',
        mobile: '',
        address: '',
        account: '',
        email: '',
        contact: '',
        type_provider_id: 0
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
    if (!this.$can('update', 'Providers')) return false

    this.getTypeUsers()
    this.getPlaces()

    this.getUser({ userId: this.$route.params.id })
      .then(response => {
        const userInfo = response.data.data
        this.setForm(userInfo)
      })
  },

  methods: {
    ...mapActions({
      replaceShowModalCreatePlace: 'places/replaceShowModalCreatePlace',
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      updateUser: 'users/updateUser',
      getPlaces: 'places/getPlaces',
      getUser: 'users/getUser'

    }),

    setForm (user) {
      this.form.email = user.email
      this.form.username = user.username
      this.form.last_name = user.last_name
      this.form.name = user.name
      this.form.dni = user.dni
      this.form.telephone = user.telephone
      this.form.image = user.image || 'image_path_url_image'
      this.form.image_path = user.image_path || 'image_path_url_image'
      this.form.state = user.state
      this.form.type_user_id = user.typeUser ? user.typeUser.id : ''
      this.form.place_id = user.place ? user.place.id : ''
    },

    submitUpdateProvider () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateUser({
        userId: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'sgcUsersList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')

      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG!')
      }
      if (!isLt5M) {
        this.$message.error('La imagen excede los 2MB!')
      }
      return isJPG && isLt5M
    }
  }

}
</script>
