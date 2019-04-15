<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('create', 'Products')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Products', to: { name : 'sgcProductsList' } },
          { name: 'Nuevo producto' }
        ]"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
          md6
          sm6
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Registrar Producto</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateProduct"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                   <v-text-field
                    v-model="form.bar"
                    :disabled="processingForm"
                    label="Codigo de barras"
                    :rules="rules.bar"
                    :error="!!formErrors.bar"
                    :error-messages="formErrors.bar"
                    @keyup="() => {
                      formErrors.bar = undefined
                      delete formErrors.bar
                    }"
                  />
                  <v-text-field
                    v-model="form.stock"
                    :disabled="processingForm"
                    label="Stock"
                    :rules="rules.stock"
                    :error="!!formErrors.stock"
                    :error-messages="formErrors.stock"
                    @keyup="() => {
                      formErrors.stock = undefined
                      delete formErrors.stock
                    }"
                  />
                  <v-text-field
                    v-model="form.condition"
                    :disabled="processingForm"
                    label="Condición"
                    :error="!!formErrors.condition"
                    :error-messages="formErrors.condition"
                    @keyup="() => {
                      formErrors.condition = undefined
                      delete formErrors.condition
                    }"
                  />
                  <v-text-field
                    v-model="form.grouped"
                    :disabled="processingForm"
                    label="Grupo"
                    :error="!!formErrors.grouped"
                    :error-messages="formErrors.grouped"
                    @keyup="() => {
                      formErrors.grouped = undefined
                      delete formErrors.grouped
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
                        item-text="condition"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.place_id"
                        :error-messages="formErrors.place_id"
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
                  <v-btn @click="$router.push({ condition: 'sgcProductsList' })">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Nuevo Producto' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {
      formErrors: {},
      form: {
        bar: '',
        stock: 0,
        condition: 'bajo',
        grouped: 0,
        kairo_product_id: 0,
        kairo_composition_id: 0,
        kairo_description_id: 0,
        kairo_laboratory_id:0,
      },

      validForm: true,
      processingForm: false,

      rules: {
        bar: [
          v => !!v || 'El codigo de barras es requerido'
        ],
        condition: [
          v => !!v || 'El condicion es requerido',
        ],
        grouped: [
          v => !!v || 'El grupo es requerida'
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
      replaceCurrentUser: 'users/replaceCurrentUser',
      getTypeUsers: 'typeUsers/getTypeUsers',
      createUser: 'users/createUser',
      getPlaces: 'places/getPlaces',
      getUsers: 'users/getUsers'

    }),

    submitCreateProduct () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createUser({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ condition: 'sgcUsersList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    },
  }

}
</script>
