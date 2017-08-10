<template lang='pug'>
  div.user-section
    div(v-if="patient && patient.id")
      b Patient: {{ patient }}
      span &nbsp; &nbsp;
      button(@click.prevent="clearUser") New Patient
      button(@click.prevent="test") Test
    div(v-if="!patient || !patient.id")
      Search(scope='user', url='http://localhost:3002/lookup/search', prompt='Find Patient')
      hr
      SearchResults(scope='user' noDataMsg='no patient')
      hr
      button(@click.prevent="test") Test 
      button(@click.prevent="test2") ++    
</template>

<script>
  import { mapState } from 'vuex'
  import Search from './../Standard/Search.vue'
  import SearchResults from './../Standard/SearchResults.vue'

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
        search: {table: 'user', fields: ['name', 'email']}
      }
    },
    computed: mapState([
      'patient',
      'selected',
      'searchResults',
      'searchStatus'
    ]),
    methods: {
      clearUser () {
        this.$store.commit('clearUser')
      }
    }
  }
</script>
