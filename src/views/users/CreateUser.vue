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
      >
        <v-flex
          md4
          sm4
          xs12
          class="text-xs-center"
        >
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </v-flex>
        <v-flex
          md6
          sm6
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Usuario</span>
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
                  <v-text-field
                    v-model="form.password"
                    type="password"
                    :disabled="processingForm"
                    label="Contraseña"
                    :rules="rules.password"
                    :error="!!formErrors.password"
                    :error-messages="formErrors.password"
                    @keyup="() => {
                      formErrors.password = undefined
                      delete formErrors.password
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
        </v-flex>
      </v-layout>
    </template>
    <ModalCreatePlace />
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
    NotPermission: () => import('@/views/errors/NotPermission'),
    ModalCreatePlace: () => import('@/views/places/ModalCreatePlace.vue')
  },

  data () {
    return {
      imageUrl: '',
      formErrors: {},

      form: {
        email: '',
        username: '',
        password: '',
        last_name: '',
        name: '',
        dni: '',
        telephone: '',
        image: 'image_path_url_image',
        image_path: 'image_path_url_image',
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
      replaceShowModalCreatePlace: 'places/replaceShowModalCreatePlace',
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      createUser: 'users/createUser',
      getPlaces: 'places/getPlaces',
      getUsers: 'users/getUsers'

    }),

    submitCreateUser () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createUser({ data: this.form })
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

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG!')
      }
      if (!isLt2M) {
        this.$message.error('La imagen excede los 2MB!')
      }
      return isJPG && isLt2M
    }
  }

}
</script>
