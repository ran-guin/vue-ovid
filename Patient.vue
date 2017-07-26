<template lang='pug'>
  div.user-section
    div(v-if="patient && patient.id")
      b Patient: {{ patient }}
      span &nbsp; &nbsp;
      button(@click.prevent="clearUser") New Patient
      button(@click.prevent="test") Test
    div(v-if="!patient || !patient.id")
      Search(scope='patient', model='user' url='http://localhost:1234/Record_API/search', :search="search", prompt='Find Patient')
      hr
      Picked(scope='patient')
      hr
      SearchResults(scope='patient' reference='name' noDataMsg='no patient')
</template>

<script>

import { mapState } from 'vuex'
import Search from './../Standard/Search.vue'
import SearchResults from './../Standard/SearchResults.vue'
import Picked from './../Standard/Picked.vue'

export default {
  name: 'patient',
  components: {
    Search,
    SearchResults,
    Picked
  },
  data () {
    return {
      myName: 'noah',
      searchstring: '',
      title: 'Patient Dashboard',
      menu: {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'},
      search: {'user': ['name', 'email']}
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
