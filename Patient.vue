<template lang='pug'>
  div.user-section
    div(v-if="patient && patient.id")
      b Patient: {{ patient }}
      span &nbsp; &nbsp;
      button(@click.prevent="clearUser") New Patient
      button(@click.prevent="test") Test
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
    }
  }
</script>
