<template>
  <div>
    <v-container
      fluid
      grid-list-xl
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          sm6
          xs12
        >
          <v-autocomplete
            v-model="form.user_id"
            :items="[]"
            dense
            clearable
            small-chips
            label="Tipo de proveedor"
            item-text="type"
            item-value="id"
            :disabled="processingForm"
            :error="!!formErrors.user_id"
            :error-messages="formErrors.user_id"
            append-outer-icon="add_circle"
            @click:append-outer="{}"
            @change="() => {
              formErrors.user_id = undefined
              delete formErrors.user_id
            }"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {

  data () {
    return {
      form: {
        total: 0,
        date: '2019-05-03',
        state: 'normal',
        invoice: 'string',
        user_id: 0
      },

      validForm: true,
      processingForm: false,

      formErrors: {}

    }
  }

}
</script>
