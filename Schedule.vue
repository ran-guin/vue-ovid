<template lang='pug'>
  div.schedule-section
    Search(:id='vaccineString' scope='vaccine' method='get' url='https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?' searchParameter='product_name' prompt='Search for Disease of Vaccine')
    hr
    SearchResults(scope='vaccine')

</template>

<script>

import { mapState } from 'vuex'
import Search from './../Standard/Search.vue'
import SearchResults from './../Standard/SearchResults.vue'

export default {
  name: 'schedule',
  data () {
    return {
      msg: 'schedule message',
      vaccineString: ''
    }
  },
  components: {
    Search,
    SearchResults
  },
  computed: mapState([
    'patient',
    'selected',
    'searchResults',
    'count'
  ]),
  methods: {
    searchVaccines (evt) {
      console.log('search vaccines for ' + this.searchstring)
      console.log(JSON.stringify(evt))
      this.$store.commit('searchVaccines', document.getElementById('vaccineString').value)
    }
  }
}
</script>

<style scoped>
  .schedule {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }  
</style>
