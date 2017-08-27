// Webpack CSS import

// JS import

<template lang='pug'>
  div
    h3 Immunize (?)
</template>

<script>
import dbRecordModal from './../Standard/dbRecordModal.vue'

export default {
  name: 'immunize',
  data () {
    return {
      search: {table: 'vaccine', fields: ['name']},
      showModal: false
    }
  },
  components: {
    dbRecordModal
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
