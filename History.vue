<template lang='pug'>
  span.history-section
    div.block-header
      Demo(:demo="demo" name='disease')
      h3 Immunization History
    div.block-body
      div(v-if="history && history.length")
        DataGrid.block-grid(:data="history" :options="data_options")
      div(v-else)
        b No Immunization History
      div(v-if="help")
        Block(:content="help") 
    div.block-footer(v-if="footer")
      div(v-html="footer")
</template>

<script>
import DataGrid from './../Standard/DataGrid.vue'
import Modal from './../Standard/Modal.vue'
import Block from './../Standard/Block.vue'
import Demo from './Demo.vue'

export default {
  name: 'history',
  components: {
    DataGrid,
    Modal,
    Demo,
    Block
  },
  data () {
    return {
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      search: {'vaccine': ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      helpList: ['View Immunization History', 'Printout Immunization History'],
      data_options: {title: 'History', fields: ['vaccine', 'status']},
      footer: ''
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
    help: function () {
      return '<p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
    }
  }
}
</script>

<style scoped>

</style>
