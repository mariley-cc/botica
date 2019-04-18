<template>
  <v-dialog
    v-model="showModalCreatePlace"
    width="480px"
    persistent
    lazy
    scrollable
  >
    <v-card>
      <v-card-title
        primary-title
        class="py-2"
      >
        <span class="success--text font-weight-bold headline">Registrar Botica</span>
        <v-spacer />
        <v-btn
          icon
          flat
          @click="replaceShowModalCreatePlace({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
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
            <v-text-field
              v-model="form.address"
              :disabled="processingForm"
              label="Dirección"
              :error="!!formErrors.address"
              :error-messages="formErrors.address"
              @keyup="() => {
                formErrors.address = undefined
                delete formErrors.address
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
          <v-divider class="mb-2" />
          <div class="text-xs-center pb-2">
            <v-btn
              type="submit"
              color="success"
              :disabled="!validForm || processingForm"
              :loading="processingForm"
            >
              Guardar
            </v-btn>
            <v-btn @click="replaceShowModalCreatePlace({ status: false })">
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
      processingForm: false
    }
  },

  computed: {
    ...mapState({
      showModalCreatePlace: state => state.places.showModalCreatePlace
    })
  },

  watch: {
    showModalCreatePlace: function (newState, OldState) {
      if (!newState) return false
      this.form.name = ''
      this.form.address = ''
      this.form.personal = 2
      this.form.telephone = ''
      this.form.image = 'string'
      this.form.image_path = 'string'
    }
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
          this.getPlaces()
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
