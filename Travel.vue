<template lang='pug'>
  span
    div.block-header
      Demo(:demo="demo" name='disease')
      h3 Travel Plans
        b &nbsp; &nbsp;
        Modal(id='travel-modal' type='search' :options="search_modal" :picked="travel")
        <!-- Modal(id='travel-modal-info' :options="info_modal" :toggle="info_modal.toggle") -->
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
        userURL: config.userUrl,
        countryUrl: config.travelUrl,
        input: ['region'],
        data_options: {
          title: 'Travel Plans',
          fields: ['country', 'region', 'subregion'],
          addLinks: [
            {type: 'button', name: 'Protect me', function: this.CoverMe},
            {type: 'button', name: '?', function: this.info}
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
          openButton: '+',
          closeButton: 'Finished adding Travel',
          data_options: {fields: ['country', 'region', 'subregion']},

          search: {
            scope: 'country',
            model: 'country',
            method: 'get',
            url: config.travelUrl,
            prompt: 'Search Regions',
            title: 'Travel Plans',
            field: 'country',
            show_fields: ['country', 'region'],
            search_fields: ['country', 'region', 'subregion'],
            onPick: this.addTravel,
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
      info: function (record) {
        var target
        if (record.country) {
          target = record.country
        }
        if (record.subregion) {
          target += ' [' + record.subregion + ']'
        } else if (record.region) {
          target += ' [' + record.region + ']'
        }

        console.log('retrieve more info from record: ' + JSON.stringify(record))

        var data = [
          {country: record.country, region: record.region, subregion: record.subregion}
        ]
        data.details = 'detailed info regarding travel to ' + target

        this.$store.dispatch('setModalData', data)
        this.$store.getters.toggleModal('info-modal')
      },
      CoverMe: function (record) {
        console.log('add pending coverage records')

        var travelRecord = {coverage: 'Malaria', vaccine: 'TBD', status: 'recommended for travel'}
        this.$store.commit('squeezeHash', {key: 'coverage', record: travelRecord})

        console.log(JSON.stringify(record))
        this.$store.commit('setError', {context: 'update', err: 'Updated record', clear: true})
      },
      // scheduleTravel: function () {
      //   console.log('schedule travel for patient')
      // },

      MoreInfo: function (region) {
        console.log('get more info about ' + JSON.stringify(region))
      },
      toggleMe: function () {
        this.toggle = !this.toggle
      }
    },
    computed: {
      revert: function (key) {
        this.modal = this.previous_modal
      },
      travel: function () {
        console.log('load travel data')

        return this.$store.getters.getHash('travel')
      },
      addTravel: function () {
        console.log('load travel data dynamically...')

        var records = config.demo_travel_recommendations
        for (var i = 0; i < records.length; i++) {
          var record = records[i]
          this.$store.commit('squeezeHash', {key: 'coverage', record: record})
          console.log(JSON.stringify(record))
        }

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
