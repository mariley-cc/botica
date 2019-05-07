<template>
  <v-dialog
    v-model="showModalEditKairoComposition"
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
        <span class="success--text font-weight-bold headline">Editar Kairo Composition</span>
        <v-spacer />
        <v-btn
          icon
          flat
          @click="replaceShowModalEditKairoComposition({ status: false })"
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
          @submit.prevent="submitUpdateKairoDescription"
        >
          <v-container
            fluid
            grid-list-lg
          >
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
            <v-btn @click="replaceShowModalEditKairoComposition({ status: false })">
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
      formErrors: {},

      form: {
        name: '',
        state: ''
      },

      validForm: true,
      processingForm: false
    }
  },

  computed: {
    ...mapState({
      currentKairoComposition: state => state.kairoCompositions.currentKairoComposition,
      showModalEditKairoComposition: state => state.kairoCompositions.showModalEditKairoComposition
    })
  },

  watch: {
    showModalEditKairoComposition: function (newState, OldState) {
      if (!newState) return false
      this.form.name = this.currentKairoComposition.name
      this.form.state = this.currentKairoComposition.state
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalEditKairoComposition: 'kairoCompositions/replaceShowModalEditKairoComposition',
      updateKairoComposition: 'kairoCompositions/updateKairoComposition',
      getKairoCompositions: 'kairoCompositions/getKairoCompositions'
    }),

    submitUpdateKairoComposition () {
      if (!this.$refs.form.validate()) return false

      const kairoCompositionId = this.currentKairoComposition.id

      this.processingForm = true
      this.updateKairoComposition({ kairoCompositionId, data: this.form })
        .then(response => {
          this.processingForm = false
          this.replaceShowModalEditKairoComposition({ status: false })
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
