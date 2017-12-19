<template lang='pug'>
  div
    div.user-label(v-if="patient && patient.id")
      span Patient:  &nbsp;
      b.name {{ patient.name }} 
      span &nbsp; &nbsp; &nbsp;
      span Birthdate:  &nbsp;
      b.birthdate {{ patient.birthdate }} &nbsp;
      b.age [{{ age }}]
      span &nbsp; &nbsp; &nbsp;
      span {{patient.identifier_type}}:  &nbsp; 
      b.identifier {{patient.identifier}} 

      div.navbar-right
        button(@click.prevent="clearUser") New Patient
        button(@click.prevent="test") Test
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
  import SearchResults from './../Standard/SearchResults.vue'
  import config from '@/config.js'

  export default {
    name: 'patient',
    components: {
      Search,
      SearchResults
    },
    data () {
      return {
        myName: 'noah',
        searchstring: '',
        title: 'Patient Dashboard',
        menu: {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'},
        search: { user: ['name', 'email'] },
        userUrl: config.userUrl
      }
    },
    props: {
      patient: { }
    },
    methods: {
      clearUser () {
        this.$store.commit('clearUser')
      }
    },
    computed: {
      age: function () {
        return '45 yrs'
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

