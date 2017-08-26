<template lang='pug'>
  div(v-if="patient && patient.name")
    hr
    h3 History for {{patient.name}}:
    DataGrid(:data="history")

</template>

<script>
import DataGrid from './../Standard/DataGrid.vue'

export default {
  name: 'history',
  components: {
    DataGrid
  },
  data () {
    return {
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      search: {'vaccine': ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' }
    }
  },
  props: {
    page: {
      type: String,
      default: 'dashboard'
    },
    patient: {
      type: Object,
      default () { return {} }
    },
    history: {
      type: Array,
      default () { return [ {'applied': 'n/a', 'vaccine': 'n/a', 'disease': 'n/a', notes: 'nothing found'} ] }
    }
  }
}
</script>

<style scoped>

</style>
