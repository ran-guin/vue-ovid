<template lang='pug'>
  div
    div.scheduled-section 
      Schedule(:scheduled="scheduled")

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
  
  .user-section, .scheduled-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }  
</style>
