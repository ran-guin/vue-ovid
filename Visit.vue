<template lang='pug'>
  div.visit-section
    div.scheduled-section
      div.col-md-6  
        h3 Patient
        User(role='patient' :user="patient")
      div.col-md-6
        h3 Staff
        User(role='staff' :user="staff")
      hr 
      Schedule(:scheduled="scheduled")
      
      div(v-if="selected === 'dashboard'")
        b Dashboard
      div(v-if="!selected === 'dashboard'")
        b ... other page...
      div
        b Schedule user_id = {{selectOne.subject.id}}
      
      hr
      h3 Immunize:
      Immunize

      hr
      h4 History:
      DataGrid(:data="history")

</template>

<script>
import User from './../User.vue'
import Schedule from './Schedule.vue'
// import Messaging from './../Standard/Messaging.vue'
import Immunize from './Immunize.vue'
import DataGrid from './../Standard/DataGrid.vue'

export default {
  name: 'ovid',
  components: {
    User,
    Schedule,
    // Messaging,
    Immunize,
    DataGrid
  },
  data () {
    return {
      selected: 'dashboard',
      subject: { id: 0, name: 'tbd', details: {} },
      scheduled: { vaccine: '' },
      focus: { context: '', id: '' },
      menu: {options: ['dashboard', 'history', 'scheduled'], selected: 'dashboard'},
      search: {'vaccine': ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },

      name: 'tbd',
      alt_msg: 'Another message'
    }
  },
  props: {
    patient: {
      type: Object,
      default () { return {} }
    },
    staff: {
      type: Object,
      default () { return {} }
    },
    scheduled: {
      type: Array,
      default () { return [] }
    },
    treated: {
      type: Array,
      default () { return [] }
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

  methods: {
    find_user () {
      this.msg = 'revised message '
    }
  }
}
</script>

<style scoped>
  .body {
    height: auto;
  }
  
  .user-section, .scheduled-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }  
</style>
