<template>
  <v-container
    fluid
    grid-list-lg
  >
    <NotPermission v-if="!$can('list', 'Dashboard')" />
    <template v-else>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'home' } },
          { name: 'Dashboard' },
        ]"
      />
      <v-layout
        row
        wrap
      >
        <!-- Widgets-->
        <v-flex
          d-flex
          lg3
          sm6
          xs12
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div>
                <div class="headline">
                  USUARIOS
                </div>
                <br>
                <div class="font-weight-bold display-1">
                  5
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                dark
              >
                LLevame ahi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          d-flex
          lg3
          sm6
          xs12
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div>
                <div class="headline">
                  PRODUCTOS
                </div>
                <br>
                <div class="font-weight-bold display-1">
                  {{ dashboard.totalProducts }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                dark
              >
                LLevame ahi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          d-flex
          lg3
          sm6
          xs12
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div>
                <div
                  class="headline"
                  center
                >
                  COMPRAS
                </div>
                <br>
                <div class="font-weight-bold display-1">
                  43
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                dark
              >
                LLevame ahi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex
          d-flex
          lg3
          sm6
          xs12
        >
          <v-card
            color="blue-grey darken-2"
            class="white--text"
          >
            <v-card-title primary-title>
              <div>
                <div class="headline">
                  VENTAS
                </div>
                <br>
                <div class="font-weight-bold display-1">
                  34
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn
                flat
                dark
              >
                LLevame ahi
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      <!-- Widgets Ends -->
      </v-layout>
      <br>
      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>RESUMEN DE COMPRAS</v-toolbar-title>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-data-table
            :headers="headers"
            :items="desserts"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">
                {{ props.item.year }}
              </td>
              <td class="text-xs-left">
                {{ props.item.mes }}
              </td>
              <td class="text-xs-left">
                {{ props.item.cantidad }}
              </td>
              <td class="text-xs-left">
                {{ props.item.total }}
              </td>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
      <br>
      <br>
      <v-card>
        <v-toolbar
          color="info"
          dark
          card
        >
          <v-toolbar-title>RESUMEN DE PAGOS PENDIENTES</v-toolbar-title>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-data-table
            :headers="headers1"
            :items="desserts1"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">
                {{ props.item.factura }}
              </td>
              <td class="text-xs-left">
                {{ props.item.proveedor }}
              </td>
              <td class="text-xs-left">
                {{ props.item.fecha }}
              </td>
              <td class="text-xs-left">
                {{ props.item.saldo }}
              </td>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'auth',

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: v => v.length <= 25 || 'Input too long!',
      pagination: {},
      headers: [
        {
          text: 'Año',
          align: 'left',
          value: 'year'
        },
        {
          text: 'Mes',
          value: 'mes'
        },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Total S/.', value: 'total' }
      ],
      desserts: [
        {
          year: '2019',
          mes: 'enero',
          cantidad: 6.0,
          total: 24
        },
        {
          year: '2019',
          mes: 'febrero',
          cantidad: 9.0,
          total: 37
        }
      ],
      headers1: [
        {
          text: 'Factura',
          align: 'left',
          value: 'factura'
        },
        {
          text: 'Proveedor',
          value: 'proveedor'
        },
        { text: 'F Emision', value: 'fecha' },
        { text: 'Saldo S/.', value: 'saldo' }
      ],
      desserts1: [
        {
          factura: 'F201-10004532',
          proveedor: 'Proveedor A',
          fecha: '2019-03-19',
          saldo: 2400
        }
      ]
    }
  },

  metaInfo () {
    return { title: 'Dashboard' }
  },
  computed: {
    ...mapState({
      dashboard: state => state.dashboard.dashboard,
      loadingDashboard: state => state.dashboard.loadingDashboard
    })

  },

  watch: {

  },

  created () {
    if (!this.$can('list', 'Dashboard')) return false
    this.getDashboard()
  },

  methods: {
    ...mapActions({
      getDashboard: 'dashboard/getDashboard'
    })
  }
}
</script>
