<template>
  <div>
    <v-toolbar
      flat
      color="white"
    >
      <v-toolbar-title>Kairo Composicion</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      />
      <v-spacer />

      <template>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          @click="replaceShowModalCreateKairoComposition({ status:true})"
        >
          Agregar Nuevo
        </v-btn>
      </template>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="kairocompositions"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td
          class="text-xs-right"
        >
          {{ props.item.state }}
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="onLoadModalEdit(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <ModalCreateKairoComposition />
    <ModalEditKairoComposition />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    ModalCreateKairoComposition: () => import('@/views/kairos/compositions/ModalCreateKairoCompositions'),
    ModalEditKairoComposition: () => import('@/views/kairos/compositions/ModalEditKairoCompositions')
  },

  data: () => ({
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Estado', value: 'state' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      state: 'activo'
    },
    defaultItem: {
      name: '',
      state: 'activo'
    }
  }),
  computed: {
    ...mapState({
      kairocompositions: state => state.kairoCompositions.kairocompositions,
      loadingKairoCompositions: state => state.kairoCompositions.loadingKairoCompositions
    })
  },

  created () {
    this.getKairoCompositions()
  },

  methods: {
    ...mapActions({
      replaceShowModalEditKairoComposition: 'kairoCompositions/replaceShowModalEditKairoComposition',
      replaceShowModalCreateKairoComposition: 'kairoCompositions/replaceShowModalCreateKairoComposition',
      replaceCurrentKairoComposition: 'kairoCompositions/replaceCurrentKairoComposition',
      getKairoCompositions: 'kairoCompositions/getKairoCompositions'
    }),
    onLoadModalEdit (kairocomposition) {
      this.replaceCurrentKairoComposition({ kairocomposition })
      this.replaceShowModalEditKairoComposition({ status: true })
    }
  }
}
</script>
