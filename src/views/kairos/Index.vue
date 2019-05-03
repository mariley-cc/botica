<template>
  <v-container
    fluid
    grid-list-lg
  >
    <template>
        <Breadcrumbs
        :routes="[
          { name: 'Revista Kairo', to: { name: '' } },
          { name: 'Kairos' },
          { name: 'Listado' }
        ]"
      />
      <v-layout
        row
        wrap
      >
        <v-flex
            sm6
            xs12
        >
            <KairoLaboratories />
        </v-flex>
        <v-flex
            sm6
            xs12
        >
            <KairoProducts />
        </v-flex>
        <v-flex
            sm6
            xs12
        >
            <KairoDescriptions />
        </v-flex>
        <v-flex
            sm6
            xs12
        >
            <KairoCompositions />
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
    return { title: 'Listado de Kairos' }
  },

  components: {
    NotPermission: () => import('@/views/errors/NotPermission'),
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    KairoCompositions: () => import('@/views/kairos/compositions/KairoCompositions'),
    KairoLaboratories: () => import('@/views/kairos/laboratories/KairoLaboratories'),
    KairoDescriptions: () => import('@/views/kairos/descriptions/KairoDescriptions'),
    KairoProducts: () => import('@/views/kairos/products/KairoProducts')
  }
}
</script>

<style scoped>

</style>
