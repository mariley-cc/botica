<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('update', 'Products')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Products', to: { name: 'sgcProductsList' } },
          { name: 'Editar usuario' }
        ]"
      />

      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
        >
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Producto</span>
            </v-card-title>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateProduct"
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
                        v-model="form.kairo_laboratory_id"
                        :items="laboratories"
                        :loading="loadingLaboratories"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar tipo de laboratorio"
                        item-text="name"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.kairo_laboratory_id"
                        :error-messages="formErrors.kairo_laboratory_id"
                        @change="() => {
                          formErrors.kairo_laboratory_id = undefined
                          delete formErrors.kairo_laboratory_id
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.kairo_product_id"
                        :items="kairoproducts"
                        :loading="loadingKairoProducts"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar kairo product"
                        item-text="name"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.kairo_product_id"
                        :error-messages="formErrors.kairo_product_id"
                        @change="() => {
                          formErrors.kairo_product_id = undefined
                          delete formErrors.kairo_product_id
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.kairo_composition_id"
                        :items="kairocompositions"
                        :loading="loadingKairoCompositions"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar kairo composition"
                        item-text="name"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.kairo_composition_id"
                        :error-messages="formErrors.kairo_composition_id"
                        @change="() => {
                          formErrors.kairo_composition_id = undefined
                          delete formErrors.kairo_composition_id
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-autocomplete
                        v-model="form.kairo_description_id"
                        :items="kairodescriptions"
                        :loading="loadingKairoDescriptions"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar kairo product"
                        item-text="name"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.kairo_description_id"
                        :error-messages="formErrors.kairo_description_id"
                        @change="() => {
                          formErrors.kairo_description_id = undefined
                          delete formErrors.kairo_description_id
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
                  <v-btn @click="$router.push({ name: 'sgcProductsList' })">
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
    return { title: 'Editar Producto' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data () {
    return {

      imageUrl: '',

      formErrors: {},

      form: {
        bar: '',
        stock: 0,
        condition: 'bajo',
        grouped: 0,
        kairo_product_id: 0,
        kairo_composition_id: 0,
        kairo_description_id: 0,
        kairo_laboratory_id: 0
      },

      validForm: true,
      processingForm: false,

      rules: {
        bar: [
          v => !!v || 'El codigo de barras es requerido'
        ],
        condition: [
          v => !!v || 'El condicion es requerido'
        ],
        grouped: [
          v => !!v || 'El grupo es requerida'
        ],
        kairo_laboratory_id: [
          v => !!v || 'El grupo es requerida'
        ]
      }
    }
  },

  computed: {
    ...mapState({
      currentProduct: state => state.products.currentProduct,
      kairoproducts: state => state.KairoProducts.kairoproducts,
      loadingKairoProducts: state => state.KairoProducts.loadingKairoProducts,
      kairodescriptions: state => state.kairoDescriptions.kairodescriptions,
      loadingKairoDescriptions: state => state.kairoDescriptions.loadingKairoDescriptions,
      kairocompositions: state => state.kairoCompositions.kairocompositions,
      loadingKairoCompositions: state => state.kairoCompositions.loadingKairoCompositions,
      laboratories: state => state.KairoLaboratories.laboratories,
      loadingLaboratories: state => state.KairoLaboratories.loadingLaboratories
    })
  },

  created () {
    if (!this.$can('update', 'Products')) return false

    this.getLaboratories()
    this.getKairoProducts()
    this.getKairoCompositions()
    this.getKairoDescriptions()

    this.getProduct({ productId: this.$route.params.id })
      .then(response => {
        const productInfo = response.data.data
        this.setForm(productInfo)
      })
  },

  methods: {
    ...mapActions({
      getProduct: 'products/getProduct',
      updateProduct: 'products/updateProduct',
      replaceCurrentProduct: 'products/replaceCurrentProduct',
      getLaboratories: 'KairoLaboratories/getLaboratories',
      createProduct: 'products/createProduct',
      getKairoProducts: 'KairoProducts/getKairoProducts',
      getKairoCompositions: 'kairoCompositions/getKairoCompositions',
      getKairoDescriptions: 'kairoDescriptions/getKairoDescriptions',
      getProducts: 'products/getProducts'

    }),

    setForm (product) {
      this.form.bar = product.bar
      this.form.stock = product.stock
      this.form.condition = product.condition
      this.form.grouped = product.grouped
      this.form.kairo_composition_id = product.kairoComposition ? product.kairoComposition.id : ''
      this.form.kairo_product_id = product.kairoProduct ? product.kairoProduct.id : ''
      this.form.kairo_description_id = product.kairoDescription ? product.kairoDescription.id : ''
      this.form.kairo_laboratory_id = product.kairoLaboratory ? product.kairoLaboratory.id : ''
    },

    submitUpdateProduct () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.updateProduct({
        productId: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'sgcProductsList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
