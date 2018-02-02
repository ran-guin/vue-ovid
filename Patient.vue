<template lang='pug'>
  div
    div.user-label(v-if="patient && patient.id")
      Modal(id='patient-modal' type='record' :options="patient_modal" :record="patient" openButton='OH')
      span &nbsp; &nbsp; Patient:  &nbsp;
      b.name {{ patient.name }}
      span &nbsp; &nbsp; &nbsp;
      span Birthdate:  &nbsp;
      b.birthdate {{ patient.birthdate }} &nbsp;
      b.age(v-if='patient.birthdate') [{{ age }} yrs]
      span &nbsp; &nbsp; &nbsp;
      span {{patient.identifier_type}}:  &nbsp; 
      b.identifier {{patient.identifier}} 

      div.navbar-right
        button.btn.btn-primary(@click.prevent="clearUser") New Patient
        <!-- button.btn(@click.prevent="test") Test -->
        span &nbsp; &nbsp; &nbsp;
    div(v-if="!patient || !patient.id")
      Search(scope='patient', model='user' :url='userUrl', :search="search", prompt='Find Patient')
      hr
      Picked(scope='patient')
      hr
      SearchResults(scope='patient' reference='name' noDataMsg='no patient')
</template>

<script>
  import Search from './../Standard/Search.vue'
  import Modal from './../Standard/Modal.vue'
  import SearchResults from './../Standard/SearchResults.vue'
  import config from '@/config.js'

  export default {
    name: 'patient',
    components: {
      Search,
      Modal,
      SearchResults
    },
    data () {
      return {
        myName: 'noah',
        searchstring: '',
        title: 'Patient Dashboard',
        menu: {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'},
        search: { user: ['name', 'email'] },
        userUrl: config.userUrl,
        patient_modal: {
          access_type: 'read',
          table: 'patient',
          toggle: true,
          onSave: this.saveProfile,
          openButton: '?'
        }
      }
    },
    props: {
      patient: { }
    },
    methods: {
      clearUser () {
        this.$store.commit('clearUser')
      },
      saveProfile () {
        console.log('save profile')
      }
    },
    computed: {
      age: function () {
        if (this.patient && this.patient.birthdate) {
          var bd = new Date(this.patient.birthdate)
          var ageDifMs = Date.now() - bd.getTime()
          var ageDate = new Date(ageDifMs) // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970)
        } else {
          return '?'
        }
      }
    }
  }
</script>

<style scoped>
  .user-label {
    width: 100%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 20px;
  } 
</style>

