<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Providers')" />

    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Proveedores' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-card-title
          primary-title
          class="info py-1 white--text"
        >
          <span class="headline">Proveedores</span>
          <v-spacer />
          <v-btn
            :to="{ name: 'sgcProvidersCreate' }"
          >
            Agregar Proveedor
          </v-btn>
        </v-card-title>

        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="providers.length"
              sm6
            >
              <v-text-field
                v-model="searchProviders"
                :disabled="loadingProviders"
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
                  { text: 'Nombre', value: 'name' },
                  { text: 'Ruc', value: 'ruc' },
                  { text: 'contacto', value: 'mobile' },
                  { text: 'cuenta', value: 'account' },
                  { text: 'tipo', value: 'typeProvider.name' },
                ]"
                :items="providers"
                :search="searchProviders"
                :loading="loadingProviders"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.ruc }}</td>
                  <td>{{ props.item.mobile }}</td>
                  <td>{{ props.item.account }}</td>
                  <td>{{ props.item.typeProvider.name }}</td>
                  <td class="text-xs-right">
                    <template v-if="$can('update', 'Providers')">
                      <v-btn
                        class="ma-0"
                        :to="{ name: 'sgcProviderEdit', params: { id: props.item.id } }"
                        small
                        fab
                        flat
                        color="info"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                    </template>

                    <v-btn
                      v-if="$can('delete', 'Providers')"
                      class="ma-0"
                      small
                      fab
                      flat
                      color="error"
                      @click="openModalDeleteProvider(props.item)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <ModalDeleteProvider />
    </template>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  metaInfo () {
    return { title: 'Listado de Proveedores' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ModalDeleteProvider: () => import('@/views/providers/ModalDeleteProvider')
  },

  data () {
    return {
      searchProviders: ''
    }
  },

  computed: {
    ...mapState({
      providers: state => state.providers.providers,
      loadingProviders: state => state.providers.loadingProviders
    })
  },

  created () {
    if (!this.$can('list', 'Providers')) return false

    this.getProviders()
  },

  methods: {
    ...mapActions({
      getProviders: 'providers/getProviders',
      replaceShowModalDeleteProvider: 'providers/replaceShowModalDeleteProvider',
      replaceCurrentProvider: 'providers/replaceCurrentProvider',
      replaceProviders: 'providers/replaceProviders'
    }),

    openModalDeleteProvider (provider) {
      this.replaceCurrentProvider({ provider })
      this.replaceShowModalDeleteProvider({ status: true })
    }
  }
}
</script>

<style scoped>

</style>
