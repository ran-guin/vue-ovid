<template lang='pug'>
  div
    PrivateHeader(:payload="payload" :demo="demo")
    Messaging
    div.flexWrapper
      div.flexChild.mainBlock
          Coverage(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :patients="patients" :payload="payload")
      div.flexChild.mainBlock
          Schedule(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :payload="payload")
    div.flexWrapper
      div.flexChild.mainBlock
          Travel(:scheduled="scheduled" :demo="demo" :staff="staff" :patient="patient" :payload="payload")
      div.flexChild.mainBlock
          History(:patient="patient" :demo="demo" :payload="payload")
    PublicFooter

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
import PublicFooter from './../PublicFooter.vue'

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
    PrivateHeader,
    PublicFooter
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

    var patient = payload.patient
    console.log('patient: ' + JSON.stringify(patient))
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

<style>
  .body {
    height: auto;
  }
  
  .pageWrapper {
    margin: 0px;
  }

  .flexWrapper {
    display: flex;
    flex-flow: row no-wrap;
  }

  .flexChild {
    flex: 1;
    justify-content: space-around;
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

  .block {
    padding: 0px;
    /*border: 1px solid black;*/
    min-height: 200px;
  }

  .block-header {
    padding: 10px;
    background-color: #ccc;
  }
  .block-subheader {
    padding: 10px;
    background-color: #ddd;
  }  
  .block-body {
    padding: 20px;
    background-color: #eee;    
  }
  .block-footer {
    padding: 20px;
    background-color: '#eee';
  } 
</style>
