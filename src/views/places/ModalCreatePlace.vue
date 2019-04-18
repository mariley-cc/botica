<template>
  <v-dialog
    v-model="showModalCreatePlace"
    width="480px"
    persistent
    lazy
    scrollable
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
          @submit.prevent="submitCreatePlace"
        >
          <v-container
            fluid
            grid-list-lg
          >
            <div class="text-xs-center">
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
            </div>
            <v-text-field
              v-model="form.name"
              :disabled="processingForm"
              label="Nombre / Descripción"
              :error="!!formErrors.name"
              :error-messages="formErrors.name"
              @keyup="() => {
                formErrors.name = undefined
                delete formErrors.name
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
                  v-model="form.personal"
                  :disabled="processingForm"
                  label="N° de personal"
                  mask="##"
                  return-masked-value
                  :error="!!formErrors.personal"
                  :error-messages="formErrors.personal"
                  @keyup="() => {
                    formErrors.personal = undefined
                    delete formErrors.personal
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
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Nuevo Usuario' }
  },

  data () {
    return {
      imageUrl: '',
      formErrors: {},

      form: {
        name: '',
        address: '',
        personal: 2,
        telephone: '',
        image: 'string',
        image_path: 'string'
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
      places: state => state.places.places,
      loadingPlaces: state => state.places.loadingPlaces,
      showModalCreatePlace: state => state.places.showModalCreatePlace
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalCreatePlace: 'places/replaceShowModalCreatePlace',
      createPlace: 'places/createPlace',
      getPlaces: 'places/getPlaces',
      getUsers: 'users/getUsers'
    }),

    submitCreatePlace () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createPlace({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalCreatePlace({ status: false })
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
