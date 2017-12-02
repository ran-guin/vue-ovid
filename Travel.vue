<template lang='pug'>
  span
    div.block-header
      Demo(:demo="demo" name='disease')
      h3 Travel Plans
        Modal(id='travel-modal' :options="search_modal" :picked="travel" closeButton="Finished adding Travel")
        Modal(id='travel-modal-info' :options="info_modal" :toggle="info_modal.toggle")
    div.block-body
      div(v-if="travel && travel.length")
        DataGrid.block-grid(:data="travel" :options="data_options")
      div(v-else)
        b No Travel Plans
      div(v-if="help")
        Block(:content="help") 
    div.block-footer(v-if="footer")
      div(v-html="footer")
</template>

<script>
  import Search from './../Standard/Search.vue'
  import Modal from './../Standard/Modal.vue'
  import DataGrid from './../Standard/DataGrid.vue'
  import Block from './../Standard/Block.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'

  export default {
    name: 'Travel',
    components: {
      Search,
      Modal,
      Demo,
      Block,
      DataGrid
    },
    data () {
      return {
        msg: 'Travel message',
        coverage: [],
        travelString: 'travelSearch',
        userURL: config.userURL,
        countryUrl: config.travelUrl,
        input: ['region'],
        data_options: {
          title: 'Travel Plans',
          fields: ['country', 'region', 'subregion'],
          addLinks: [
            {type: 'button', name: 'Protect me', modal: {openButton: 'Save'}},
            {type: 'button', name: '?', function: this.MoreInfo}
          ]
        },
        links: {
          'more info': this.info,
          'Protect Me': this.coverMe,
          'revert': this.revert
        },
        info_modal: {
          type: 'block',
          title: 'Info Modal',
          header: 'Info header',
          body: 'info...',
          openButton: 'Info',
          closeButton: 'Close info',
          toggle: false
        },
        search_modal: {
          type: 'search',
          scope: 'travel',
          search: {
            model: 'country',
            method: 'get',
            url: config.travelURL,
            prompt: 'Search Regions',
            title: 'Travel Plans',
            field: 'country',
            show_fields: ['country', 'region'],
            search_fields: ['country', 'region', 'subregion'],
            onPick: this.travel,
            multiSelect: true,
            target: 'travel'
          },
          data: {
            title: 'Current Travel Plans',
            fields: ['country', 'subregion', 'region'],
            addLinks: [{type: 'button', name: '?'}]
          }
        },
        helpList: ['Check recommendations', 'Schedule coverage for patients'],
        footer: ''
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
    methods: {
      scheduleTravel: function (country, timestamp) {
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
      info: function (record) {
        console.log(JSON.stringify(record))
        console.log('retrieve more info...')

        this.info_modal.body = 'New travel information Auto-generated...'
        this.info_modal.toggle = false

        this.$store.getters.toggleModal('cov-modal2')
      },
      CoverMe: function (record) {
        console.log('add record to travel list')
        console.log(JSON.stringify(record))
        this.$store.commit('setError', {context: 'update', err: 'Updated record', clear: true})
      },
      revert: function (key) {
        this.modal = this.previous_modal
      },
      travel: function () {
        return this.$store.getters.getHash('travel')
      },

      help: function () {
        return '<p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
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
