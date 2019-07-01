<template>
  <v-container
    fluid
    grid-list-lg
  >
    <template>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
        >
          <v-card>
            <v-layout
              align-center
              justify-center
              row
              fill-height
            >
              <v-card-title primary-title>
                <span class="success--text font-weight-bold headline align-center justify-center">FORMULARIO DE PRE-INCRIPCIÓN</span>
              </v-card-title>
            </v-layout>
            <v-divider />
            <v-card-text
              class="pa-0"
            >
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateAdmision"
              >
                <v-container
                  fluid
                  grid-list-lg
                >
                  <h3>Datos Principales</h3>
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
                        :disabled="processing"
                        label="DNI"
                        :rules="rules.dni"
                        :error="!!formErrors.dni"
                        :error-messages="formErrors.dni"
                        :counter="8"
                        maxlength="8"
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
                        v-model="form.cdni"
                        :disabled="processing"
                        label="Confirmar DNI"
                        :rules="rules.cdni"
                        :error="!!formErrors.cdni"
                        :error-messages="formErrors.cdni"
                        :counter="8"
                        maxlength="8"
                        @keyup="() => {
                          formErrors.cdni = undefined
                          delete formErrors.cdni
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-btn
                    v-model="disabled"
                    large
                    :disabled="!validForm || processing "
                    color="success"
                    @click="validate"
                  >
                    Aceptar
                  </v-btn>
                  <v-layout
                    v-model="panel"
                    row
                    wrap
                    :disabled="disabled"
                  >
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.name"
                        :disabled="disabled"
                        label="Nombres"
                        :error="!!formErrors.name"
                        :error-messages="formErrors.name"
                        @keyup="() => {
                          formErrors.name = undefined
                          delete formErrors.name
                        }"
                      />
                    </v-flex>
                    <v-flex
                      sm6
                      xs12
                    >
                      <v-text-field
                        v-model="form.last_name"
                        :disabled="disabled"
                        label="Apellidos"
                        :error="!!formErrors.last_name"
                        :error-messages="formErrors.last_name"
                        @keyup="() => {
                          formErrors.last_name = undefined
                          delete formErrors.last_name
                        }"
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm6
                    xs12
                  >
                    <v-autocomplete
                      v-model="form.career_id"
                      :disabled="disabled"
                      :items="carrera"
                      label="Seleccionar Carrera"
                      autocomplete
                    />
                  </v-flex>
                  <h2>Colegio de Procedencia</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_region"
                        :disabled="disabled"
                        :items="region"
                        label="Seleccionar Región"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_province"
                        :disabled="disabled"
                        :items="province"
                        label="Seleccionar Provincia"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.school_district"
                        :disabled="disabled"
                        :items="district"
                        label="Seleccionar Distrito"
                        autocomplete
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm12
                    xs12
                  >
                    <!-- <v-text-field
                      v-model="form.school_name"
                      :disabled="disabled"
                      label="Nombre del Colegio"
                      :rules="rules.school_name"
                      :error="!!formErrors.school_name"
                      :error-messages="formErrors.school_name"
                      @keyup="() => {
                        formErrors.school_name = undefined
                        delete formErrors.school_name
                      }"
                    /> -->
                    <v-autocomplete
                      v-model="form.school_name"
                      :disabled="disabled"
                      :items="colegio"
                      label="Nombre del Colegio"
                      autocomplete
                    />
                  </v-flex>
                  <h2>Lugar de Procedencia</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_region"
                        :disabled="disabled"
                        :items="region"
                        label="Seleccionar Región"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_province"
                        :disabled="disabled"
                        :items="province"
                        label="Seleccionar Provincia"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.origin_district"
                        :disabled="disabled"
                        :items="district"
                        label="Seleccionar Distrito"
                        autocomplete
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.origin_address"
                      :disabled="disabled"
                      label="Dirección de Origin"
                      :rules="rules.origin_address"
                      :error="!!formErrors.origin_address"
                      :error-messages="formErrors.origin_address"
                      @keyup="() => {
                        formErrors.origin_address = undefined
                        delete formErrors.origin_address
                      }"
                    />
                  </v-flex>
                  <h2>Lugar de Nacimiento</h2>
                  <v-layout>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_region"
                        :disabled="disabled"
                        :items="region"
                        label="Seleccionar Región"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_province"
                        :disabled="disabled"
                        :items="province"
                        label="Seleccionar Provincia"
                        autocomplete
                      />
                    </v-flex>

                    <v-flex
                      xs12
                      md4
                    >
                      <v-autocomplete
                        v-model="form.birth_district"
                        :disabled="disabled"
                        :items="district"
                        label="Seleccionar Distrito"
                        autocomplete
                      />
                    </v-flex>
                  </v-layout>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.telephone"
                      :disabled="disabled"
                      label="Teléfono o Celular"
                      :rules="rules.telephone"
                      :error="!!formErrors.telephone"
                      :error-messages="formErrors.telephone"
                      @keyup="() => {
                        formErrors.telephone = undefined
                        delete formErrors.telephone
                      }"
                    />
                  </v-flex>
                  <v-flex
                    sm12
                    xs12
                  >
                    <v-text-field
                      v-model="form.email"
                      :disabled="disabled"
                      label="Correo Electronico"
                      :rules="rules.email"
                      :error="!!formErrors.email"
                      :error-messages="formErrors.email"
                      @keyup="() => {
                        formErrors.email = undefined
                        delete formErrors.email
                      }"
                    />
                  </v-flex>
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || disabled"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ condition: 'login' })">
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

  metaInfo () {
    return { title: 'Universidad Nacional Intercultural de Quillabamba' }
  },

  components: {
  },

  data () {
    return {
      imageUrl: '',
      panel: [false, true],
      formErrors: {},
      disabled: true,
      region: [
        'amazonas',
        'áncash',
        'apurimac',
        'arequipa',
        'ayacucho',
        'cajamarca',
        'callao',
        'cusco',
        'huancavelica',
        'huánuco',
        'ica',
        'junin',
        'la libertad',
        'lambayeque',
        'lima',
        'loreto',
        'madre de dios',
        'moquegua',
        'pasco',
        'piura',
        'puno',
        'san martin',
        'tacna',
        'tumbes',
        'ucayali'
      ],
      province: [
        'cusco',
        'acomayo',
        'anta',
        'calca',
        'canas',
        'canchis',
        'chumbivilcas',
        'espinar',
        'la convención',
        'paruro',
        'paucartambo',
        'quispicanchi',
        'urubamba'
      ],
      district: [
        'acomayo',
        'acopia',
        'acos',
        'mosoc llacta',
        'pomacanchi',
        'rondocan',
        'sangarará',
        'ancahuasi',
        'anta',
        'cachimayo',
        'huarocondo',
        'limatambo',
        'mollepata',
        'pucyura',
        'zurite',
        'calca',
        'coya',
        'lamay',
        'lares',
        'pisac',
        'san salvador',
        'taray',
        'yanatile',
        'checca',
        'kunturkanki',
        'langui',
        'layo',
        'pampamarca',
        'quehue',
        'tupac amaru',
        'yanaoca',
        'checacupe',
        'combapata',
        'marangani',
        'pitumarca',
        'san pablo',
        'san pedro',
        'sicuani',
        'tinta',
        'capacmarca',
        'chamaca',
        'colquemarca',
        'livitaca',
        'llusco',
        'quiñota',
        'santo tomas',
        'velille',
        'ccorca',
        'cusco',
        'poroy',
        'san jerónimo',
        'san sebastián',
        'santiago',
        'saylla',
        'wanchaq',
        'alto pichigua',
        'condoroma',
        'coporaque',
        'espinar',
        'ocoruro',
        'pallpata',
        'pichigua',
        'suyckutambo',
        'echarati',
        'huayopata',
        'kimbiri',
        'maranura',
        'ocobamba',
        'pichari',
        'quellouno',
        'santa teresa',
        'vilcabamba',
        'accha',
        'ccapi',
        'colcha',
        'huanoquite',
        'omacha',
        'paccaritambo',
        'paruro',
        'pillpinto',
        'yaurisque',
        'caicay',
        'challabamba',
        'colquepata',
        'huancarani',
        'kosñipata',
        'paucartambo',
        'andahuaylillas',
        'camanti',
        'ccarhuayo',
        'ccatca',
        'cusipata',
        'huaro',
        'lucre',
        'marcapata',
        'ocongate',
        'oropesa',
        'quiquijana',
        'urcos',
        'chinchero',
        'huayllabamba',
        'maras',
        'ollantaytambo',
        'urubamba',
        'yucay'
      ],
      colegio: [
        'Cep Divino Redentor',
        'World Learning Inc',
        'Servicios Educativos Larapa Kinder E.I.Rl.',
        'Promesa',
        'Tracto Sur Service S.R.L.',
        'I.E.I.P. Milagritos de Jesus E.I.R.L.',
        'Unidad Ejecutora Educacion Chumbivilcas',
        'Proyecto Peru Centre SRL',
        'C.E.P.El Carmelo',
        'San Gabriel de Larapa',
        'Educativa Adventista Sur Oriental del Peru',
        'Inversiones Gamarra Valdivia E.I.R. Limitada - In',
        'Corporación San Marcos',
        'Path Of The Heart',
        'Ceduca Bernabe Cobos S.R.L.',
        'Empresa Beron Eirl',
        'Colegio de las Mercedes S.A.C',
        'Institucion Educativa Pitagoras E.I.R. Limitada',
        'Institucion Educativa de Gestion Privada Santa Maria de los Andes Eirl',
        'I.E.P. Mx. Domingo Savio Eirl'
      ],
      carrera: [
        '1',
        '2',
        '3'
      ],
      form: {
        dni: '',
        cdni: '',
        name: '',
        last_name: '',
        telephone: '',
        email: '',
        birth_district: '',
        birth_province: '',
        birth_region: '',
        origin_district: '',
        origin_province: '',
        origin_region: '',
        origin_address: '',
        school_district: '',
        school_province: '',
        school_region: '',
        school_name: '',
        career_id: 0
      },

      validForm: true,
      processingForm: false,
      processing: false,

      rules: {
        dni: [
          v => !!v || 'El DNI es requerido',
          v => /^([VE]-)?[0-9]{1,8}$/i.test(v) || 'solo numeros'
        ],
        cdni: [
          v => !!v || 'Confirmar DNI requerido'
        ],
        name: [
          v => !!v || 'El Nombre es requerido'
        ],
        lastname: [
          v => !!v || 'El Apellido es requerido'
        ],
        school_name: [
          v => !!v || 'El Nombre del colegio requerido'
        ],
        email: [
          v => !!v || 'El Correo es Requerido',
          v => /.+@.+/.test(v) || 'E-mail tiene que ser ejemplo@gmail.com'
        ],
        telephone: [
          v => /[0-9]/.test(v) || 'solo numeros'
        ]
      }
    }
  },

  computed: {
    ...mapState({
    })
  },

  created () {

  },

  methods: {
    ...mapActions({
      replaceCurrentProduct: 'admision/replaceCurrentProduct',
      createAdmision: 'admision/createAdmision'
    }),
    validate () {
      if (this.form.dni === this.form.cdni) {
        this.disabled = false
        this.processing = true
      }
    },
    submitCreateAdmision () {
      if (!this.$refs.form.validate()) return false

      this.processingForm = true
      this.createAdmision({ data: this.form })
        .then(response => {
          this.processingForm = false
          this.$router.push({ condition: 'sgcProductsList' })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    }
  }

}
</script>
