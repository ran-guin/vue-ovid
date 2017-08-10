<template lang='pug'>
  div.visit-section
    img(src="./assets/needleIcon.png")

    Messaging
    patient(name = "Jed")
    div.scheduled-section  
      h1 Scheduled: 
      Schedule
      div(v-if="selected === 'dashboard'")
        b Dashboard
      div(v-if="!selected === 'dashboard'")
        b ... other page...
      div
        b Schedule user_id = {{selectOne.subject.id}}
      h3 Immunize:
      Immunize
</template>


<script>
import Patient from './Patient.vue'
import Schedule from './Schedule.vue'
import Messaging from './../Standard/Messaging.vue'
import Immunize from './Immunize.vue'

export default {
  name: 'user',
  components: {
    Patient,
    Schedule,
    Messaging,
    Immunize
  },
  data () {
    return {
      selected: 'dashboard',
      subject: { id: 0, name: 'tbd', details: {} },
      scheduled: { vaccine: '' },
      focus: { context: '', id: '' },
      menu: {options: ['dashboard', 'history', 'scheduled'], selected: 'dashboard'},
      search: {table: 'vaccine', fields: ['name']},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },

      name: 'tbd',
      alt_msg: 'Another message'
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
