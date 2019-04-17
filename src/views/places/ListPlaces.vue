<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Places')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Usuarios' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'sgcUsersCreate' }"
            color="success"
          >
            Agregar Usuario
          </v-btn>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="places.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                :disabled="loadingPlaces"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Botica', value: 'name' },
                  { text: 'Dirección', value: 'address' },
                  { text: '# Personal', value: 'personal' },
                  { text: 'Contacto', value: 'telephone' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="places"
                :search="searchUsers"
                :loading="loadingPlaces"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.name }}
                  </td>
                  <td class="px-3">
                    {{ props.item.address }}
                  </td>
                  <td class="px-3">
                    {{ props.item.personal }}
                  </td>
                  <td class="px-3">
                    {{ props.item.telephone }}
                  </td>
                  <td class="text-xs-center px-3">
                    <template v-if="$can('list', 'Places')">
                      <v-btn
                        class="ma-0"
                        small
                        icon
                        flat
                        color="info"
                        @click="onLoadModalEdit(props.item)"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                    </template>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de Usuarios' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      searchUsers: ''
    }
  },

  computed: {
    ...mapState({
      places: state => state.places.places,
      loadingPlaces: state => state.places.loadingPlaces
    })
  },

  watch: {
  },

  created () {
    // if (!this.$can('list', 'Places')) return false
    this.getPlaces()
  },

  methods: {
    ...mapActions({
      replaceShowModalEditPlace: 'places/replaceShowModalEditPlace',
      replaceCurrenPlace: 'places/replaceCurrenPlace',
      getPlaces: 'places/getPlaces'
    }),

    onLoadModalEdit (place) {
      this.replaceCurrenPlace({ place })
      this.replaceShowModalEditPlace({ status: true })
    },

    openModalDeleteUser (place) {
      this.replaceCurrenPlace({ place })
      this.replaceShowModalDeleteUser({ status: true })
    }

  }
}
</script>

<style scoped>

</style>
