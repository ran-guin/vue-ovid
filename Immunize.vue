// Webpack CSS import

// JS import

<template lang='pug'>
  div
    button(id="show-modal" @click="showModal = true") Load Table
    dbRecordModal(v-if="showModal" table='user' type='append' @close="showModal=false")
      h3 custom Header
    hr
    FormA(table='Equipment' type='append' prompt='Save Immunization Record')
    hr
    h3 Form Generator Below...
    ImmunizeForm
</template>

<script>

import FormA from './../Standard/Form.vue'
import dbRecordModal from './../Standard/dbRecordModal.vue'
import ImmunizeForm from './ImmunizeForm.vue'

export default {
  name: 'immunize',
  data () {
    return {
      search: {table: 'vaccine', fields: ['name']},
      showModal: false
    }
  },
  components: {
    FormA,
    dbRecordModal,
  },

  methods: {
    openModal () {
      this.$refs.modal.open('mod1')
    },

    immunize () {
      this.msg = 'immunizing'
    }
  }
}
</script>

<style scoped>
</style>
