<template>
  <div>
    <v-toolbar
      flat
      color="white"
    >
      <v-toolbar-title>Kairo Descripción</v-toolbar-title>
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
          @click="replaceShowModalCreateKairoDescription({ status:true})"
        >
          Agregar Nuevo
        </v-btn>
      </template>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="kairodescriptions"
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
    <ModalCreateKairoDescription />
    <ModalEditKairoDescription />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    ModalCreateKairoDescription: () => import('@/views/kairos/descriptions/ModalCreateKairoDescriptions'),
    ModalEditKairoDescription: () => import('@/views/kairos/descriptions/ModalEditKairoDescriptions')
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
      kairodescriptions: state => state.kairoDescriptions.kairodescriptions,
      loadingKairoDescriptions: state => state.kairoDescriptions.loadingKairoDescriptions
    })
  },

  created () {
    this.getKairoDescriptions()
  },

  methods: {
    ...mapActions({
      replaceShowModalEditKairoDescription: 'kairoDescriptions/replaceShowModalEditKairoDescription',
      replaceShowModalCreateKairoDescription: 'kairoDescriptions/replaceShowModalCreateKairoDescription',
      replaceCurrentKairoDescription: 'kairoDescriptions/replaceCurrentKairoDescription',
      getKairoDescriptions: 'kairoDescriptions/getKairoDescriptions'
    }),
    onLoadModalEdit (kairodescription) {
      this.replaceCurrentKairoDescription({ kairodescription })
      this.replaceShowModalEditKairoDescription({ status: true })
    }
  }
}
</script>
