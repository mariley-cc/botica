<template>
  <div>
    <v-toolbar
      flat
      color="white"
    >
      <v-toolbar-title>Kairo Laboratorio</v-toolbar-title>
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
          @click="replaceShowModalCreateKairoLaboratory({ status:true})"
        >
          Agregar Nuevo
        </v-btn>
      </template>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="laboratories"
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
    <ModalCreateKairoLaboratory />
    <ModalEditKairoLaboratory />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    ModalCreateKairoLaboratory: () => import('@/views/kairos/laboratories/ModalCreateKairoLaboratories'),
    ModalEditKairoLaboratory: () => import('@/views/kairos/laboratories/ModalEditKairoLaboratories')
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
      laboratories: state => state.KairoLaboratories.laboratories,
      loadingKairoLaboratories: state => state.KairoLaboratories.loadingKairoLaboratories
    })
  },

  created () {
    this.getLaboratories()
  },

  methods: {
    ...mapActions({
      replaceShowModalEditKairoLaboratory: 'KairoLaboratories/replaceShowModalEditKairoLaboratory',
      replaceShowModalCreateKairoLaboratory: 'KairoLaboratories/replaceShowModalCreateKairoLaboratory',
      replaceCurrentKairoLaboratory: 'KairoLaboratories/replaceCurrentLaboratory',
      getLaboratories: 'KairoLaboratories/getLaboratories'
    }),
    onLoadModalEdit (laboratory) {
      this.replaceCurrentKairoLaboratory({ laboratory })
      this.replaceShowModalEditKairoLaboratory({ status: true })
    }
  }
}
</script>
