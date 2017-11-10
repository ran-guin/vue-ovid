<template lang='pug'>
  span
    Demo(:demo="demo" name='travel')
    div(v-if="(staff && staff.id) || (patient && patient.id)")
      Search(:id='travelString' model='travel' title='Travel Coverage' scope='travel' method='get' :url='countryUrl' searchParameter='<region>' prompt='Check Tavel Recommendations' :multiSelect="true" :addLinks="addLinks" :addAction="scheduleTravel" :targets="trips" :fields="input")
    div(v-else)
      Block(title='Travel Monitor' :trigger="toggleMe" subheader='[Available to staff and patients]' :alt="alt_help")
      SearchModal(:picked="coverage" :search_options="search_options" close="Finished adding Travel plans" :toggle="toggle")

</template>

<script>
  import Search from './../Standard/Search.vue'
  import SearchModal from './../Standard/SearchModal.vue'
  import Block from './../Standard/Block.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'
  
  export default {
    name: 'Travel',
    data () {
      return {
        toggle: false,
        msg: 'Travel message',
        coverage: [],
        travelString: 'travelSearch',
        scheduleTravel: { 'travel': this.travel },
        userURL: config.userURL,
        countryUrl: config.countryUrl,
        input: ['region'],
        addLinks: [
          {type: 'button', name: 'Protect me', modal: {function: this.scheduleTravel, table: 'scheduleTravel', button: 'Save Destination', close: 'Cancel'}},
          {type: 'button', name: '?', function: this.MoreInfo}
        ],

        search_options: {
          scope: 'travel',
          method: 'get',
          url: config.travelURL,
          prompt: 'Search Regions',
          title: 'Travel Plans',
          field: 'name',
          fields: ['country', 'region'],
          onPick: this.travel,
          multiSelect: true
        },
        helpList: ['Check recommendations', 'Schedule coverage for patients']
      }
    },
    props: {

      staff: {
        type: Object
      },
      patient: {
        type: Object
      },
      trips: {
        type: Array
      },
      demo: {
        type: Boolean
      }
    },
    components: {
      Search,
      SearchModal,
      Demo,
      Block
    },
    methods: {
      travel: function (country, timestamp) {
        console.log('schedule travel to  ' + country + ': ' + timestamp)
      },

      // scheduleTravel: function () {
      //   console.log('schedule travel for patient')
      // },

      MoreInfo: function (region) {
        console.log('get more info about ' + region)
      },
      toggleMe: function () {
        this.toggle = !this.toggle
      }
    },
    computed: {
      alt_help: function () {
        return '<b>no current travel plans</b><p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
      }

    }
  }
</script>

<style scoped>
  .travel-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    /*border: 1px solid black;*/
    padding: 10px;
  }  
</style>
