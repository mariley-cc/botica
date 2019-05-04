<template>
  <v-dialog
    v-model="showModalDetailSale"
    width="480px"
    persistent
    lazy
    scrollable
  >
    <v-card>
      <v-toolbar
        color="error"
        card
        dark
      >
        <v-toolbar-title>Agregar Producto</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          dark
          @click="replaceShowModalDetailSale({ status: false })"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p>¿Está seguro de Eliminar el usuario?</p>

        <template v-if="currentUser">
          <ul>
            <li><strong>Nombre: </strong>{{ currentUser.name }}</li>
            <li><strong>Correo electrónico: </strong>{{ currentUser.email }}</li>
          </ul>
          <v-img
            v-if="currentUser.image_path"
            :src="currentUser.image_path"
            :lazy-src="currentUser.image_path"
            max-height="320"
            contain
            class="grey lighten-2 mt-3"
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
      </v-card-text>
      <v-divider />
      <div class="my-3 text-xs-center">
        <v-btn
          :disabled="processingDelete"
          :loading="processingDelete"
          color="error"
          @click="launchDelete"
        >
          Eliminar
        </v-btn>
        <v-btn
          :disabled="processingDelete"
          @click="replaceShowModalDetailSale({ status: false })"
        >
          Cancelar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      processingDelete: false,

      form: {
        quantity: 0,
        price: 'string',
        box: 'unidades',
        sale_id: 0,
        product_id: 0
      }
    }
  },

  computed: {
    ...mapState({
      showModalDetailSale: state => state.sales.showModalDetailSale
    })
  },

  watch: {
    showModalDetailSale (newValue, oldValue) {
      if (!newValue) {
        this.replaceCurrentUser({ user: null })
        return false
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalDetailSale: 'sales/replaceShowModalDetailSale'
    }),

    launchDelete () {
      this.processingDelete = true
    }
  }
}
</script>
