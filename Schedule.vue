<template lang='pug'>
  div.schedule-section
    Search(:id='vaccineString' scope='vaccine' method='get' url='https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?' searchParameter='product_name' prompt='Search for Disease of Vaccine')
    hr
    Picked(scope='vaccine')
    hr
    SearchResults(scope='vaccine' reference='gtin')

</template>

<script>

import { mapState } from 'vuex'
import Search from './../Standard/Search.vue'
import SearchResults from './../Standard/SearchResults.vue'
import Picked from './../Standard/Picked.vue'

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
    SearchResults,
    Picked
  },
  computed: mapState([
    'patient',
    'selected',
    'searchResults',
    'searchStatus',
    'count'
  ]),
  methods: {
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
