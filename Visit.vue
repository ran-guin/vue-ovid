<template lang='pug'>
  div
    PrivateHeader(:patient="patient" :staff="staff" :demo="demo" :patients="patients")
    Messaging
    table.table
      tr
        td.mainBlock
          Coverage(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :patients="patients" :payload="payload")
        td.mainBlock
          Schedule(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :payload="payload")
      tr
        td.mainBlock
          Travel(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :payload="payload")
        td.mainBlock
          History(:patient="patient" :demo="demo" :payload="payload")
</template>

<script>
import User from './../User.vue'
import Schedule from './Schedule.vue'
import Coverage from './Coverage'
import Travel from './Travel'
import History from './History.vue'
import DataGrid from './../Standard/DataGrid.vue'
import Messaging from './../Standard/Messaging.vue'
import PrivateHeader from './../PrivateHeader.vue'

import config from '@/config.js'

export default {
  name: 'ovid',
  components: {
    User,
    Schedule,
    Coverage,
    Travel,
    History,
    Messaging,
    DataGrid,
    PrivateHeader
  },
  data () {
    return {
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      search: {'vaccine': ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      demo: false
    }
  },
  props: {
    page: {
      type: String,
      default: 'dashboard'
    },
    patients: {
      type: Array,
      default: () => []
    },
    patient: {
      type: Object,
      default: () => {}
    },
    staff: {
      type: Object,
      default: () => {}
    },
    scheduled: {
      type: Array,
      default: () => []
    },
    treated: {
      type: Array,
      default: () => []
    },
    history: {
      type: Array,
      default () { return [ {'applied': 'n/a', 'vaccine': 'n/a', 'disease': 'n/a', notes: 'nothing found'} ] }
    }
  },
  events: {
    'incremented': function () {
      console.log('caught in visit')
    }
  },

  created: function () {
    console.log('Initialize visit...')
    var payload = config.demo_payload
    this.$store.commit('definePayload', payload)
    console.log(JSON.stringify(payload))
  },
  computed: {
    payload: function () {
      var payload = this.$store.state.payload
      console.log('retrieved ' + JSON.stringify(payload))
      return payload
    }
  },
  methods: {
    find_user () {
      console.log('find me')
      this.msg = 'revised message '
    }
  }
}
</script>

<style scoped>
  .body {
    height: auto;
  }
  
  .pageWrapper {
    margin: 0px;
  }

  .mainBlock {
    padding: 20px;
    align-content: top;
  }

  .user-section, .scheduled-section, .coverage-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }  
</style>
