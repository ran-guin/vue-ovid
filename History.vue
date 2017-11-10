<template lang='pug'>
  span.history-section
    Demo(:demo="demo" name='history')
    div(v-if="patient && patient.name")
      h3 History for {{patient.name}}:
      DataGrid(:data="history")
    div(v-else)
      Block(title='Immunization History' subheader='[user controls access restrictions to staff]' :alt='alt_help')
      
</template>

<script>
import DataGrid from './../Standard/DataGrid.vue'
import Block from './../Standard/Block.vue'
import Demo from './Demo.vue'

export default {
  name: 'history',
  components: {
    DataGrid,
    Demo,
    Block
  },
  data () {
    return {
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      search: {'vaccine': ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      helpList: ['Check Immunization History', 'See pending immunizations', 'Printout immunization history']
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
    },
    demo: {
      type: Boolean
    }
  },
  computed: {
    alt_help: function () {
      return '<b>no current history</b><p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
    }
  }
}
</script>

<style scoped>

</style>
