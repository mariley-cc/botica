<template>
  <v-dialog
    v-model="showModalCreateKairoComposition"
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
        <span class="success--text font-weight-bold headline">Crear Kairo Composition</span>
        <v-spacer />
        <v-btn
          icon
          flat
          @click="replaceShowModalCreateKairoComposition({ status: false })"
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
          @submit.prevent="submitCreateKairoComposition"
        >
          <v-container
            fluid
            grid-list-lg
          >
            <v-text-field
              v-model="form.name"
              :disabled="processingForm"
              label="Nombre "
              :error="!!formErrors.name"
              :error-messages="formErrors.name"
              @keyup="() => {
                formErrors.name = undefined
                delete formErrors.name
              }"
            />
            <v-text-field
              v-model="form.state"
              :disabled="processingForm"
              label="Estado"
              :error="!!formErrors.state"
              :error-messages="formErrors.state"
              @keyup="() => {
                formErrors.state = undefined
                delete formErrors.state
              }"
            />
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
            <v-btn @click="replaceShowModalCreateKairoComposition({ status: false })">
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
        state: 'activo'
      },

      validForm: true,
      processingForm: false
    }
  },

  computed: {
    ...mapState({
      showModalCreateKairoComposition: state => state.kairoCompositions.showModalCreateKairoComposition
    })
  },

  watch: {
    showModalCreateKairoComposition: function (newState, OldState) {
      if (!newState) return false
      this.form.name = ''
      this.form.state = ''
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalCreateKairoComposition: 'kairoCompositions/replaceShowModalCreateKairoComposition',
      createKairoComposition: 'kairoCompositions/createKairoComposition',
      getKairoCompositions: 'kairoCompositions/getKairoCompositions'
    }),

    submitCreateKairoComposition () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createKairoComposition({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalCreateKairoComposition({ status: false })
          this.getKairoCompositions()
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
