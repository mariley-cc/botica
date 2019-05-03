<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Kairo Laboratorio</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn 
            color="primary"
            dark
            class="mb-2" 
            v-on="on"
          >Agregar Nuevo</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.state" label="Estado"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="laboratories"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.state }}</td>
        <td>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">Vacio</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
  export default {
    data: () => ({
      dialog: false,
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
        state: 'activo',
      },
      defaultItem: {
        name: '',
        state: 'activo',
      }
    }),

    computed: {
      ...mapState({
        laboratories: state => state.KairoLaboratories.laboratories,
        loadingLaboratories: state => state.KairoLaboratories.loadingLaboratories
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Kairo-Laboratorio' : 'Editar Kairo-Laboratorio'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.getLaboratories()
    },

    methods: {
      ...mapActions({
        getLaboratories: 'KairoLaboratories/getLaboratories'
      }),
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>