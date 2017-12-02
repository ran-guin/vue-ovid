<template lang='pug'>
  span.schedule-section
    div.block
      div.block-header
        Demo(:demo="demo" name='vaccine')
        h3 Vaccinations Scheduled
          Modal(id='schedule-modal' type='search' :options="search_modal" :picked="scheduled" closeButton="Close Scheduler" openButton="+")
          Modal(id='immunize-modal')
      div.block-body
        div(v-if="1")
          DataGrid.block-grid(:data="scheduled" :options="data_options" :links="links")
        div(v-else)
          b Nothing Scheduled
        div(v-if="help")
          Block(:content="help") 
      div.block-footer(v-if="footer")
        div(v-html="footer")
</template>

<script>
  import Modal from './../Standard/Modal.vue'
  import DataGrid from './../Standard/DataGrid.vue'
  import Block from './../Standard/Block.vue'
  import SearchBlock from './../Standard/SearchBlock.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'
  
  export default {
    name: 'schedule',
    components: {
      Modal,
      DataGrid,
      Demo,
      Block,
      SearchBlock
    },

    data () {
      return {
        toggle: false,
        msg: 'schedule message',
        vaccineString: '',
        Immunize: { 'Immunize': this.ImmunizePatient },
        links: {
        },
        data_options: {
          title: 'Scheduled Immunizations',
          fields: ['name', 'code'],
          addLinks: [
            {type: 'button', name: 'Immunize Me', modal: {record: {access_type: 'append', table: 'immunize', openButton: 'Save Immunization Rec', close: 'Cancel'}}},
            {type: 'button', name: 'more info', modal: {onPick: this.MoreInfo}}
          ]
        },
        search_modal: {
          type: 'search',
          title: 'Immunizations',
          search: {
            scope: 'vaccine',
            model: 'vaccine',
            method: 'get',
            url: config.vaccineMirrorURL,
            prompt: 'Search Vaccines',
            field: 'name',
            search_fields: ['name', 'code'],
            show_fields: ['name', 'code'],
            // onPick: this.addCoverage,
            multiSelect: true,
            target: 'scheduled',
            picked: this.scheduled,
            onPick: this.addSchedule
          }
        },
        help: '<p ><UL><LI>Schedule Specific Vaccines for Immunization</LI><LI>Search for Vaccines</LI><LI>Check for Side-effects / Contra-indications</LI></UL>',
        gs: true
      }
    },
    props: {
      staff: {
        type: Object
      },
      patient: {
        type: Object
      },
      demo: {
        type: Boolean
      },
      footer: {
        type: String
      }
    },
    methods: {
      ImmunizePatient: function (data) {
        console.log('Immunize Me With ')
        console.log(JSON.stringify(data))
      },
      addSchedule: function (data) {
        // UNNECESSARY ... doesn't need to do anything ...
        console.log('add Schedule')
        console.log(JSON.stringify(data))
        console.log('to: ' + JSON.stringify(this.scheduled))
      }
    },
    computed: {
      scheduled: function () {
        var S = this.$store.getters.getHash('scheduled')
        console.log('load Schedule: ' + JSON.stringify(S))
        return S
      },
      updates: function () {
        var updates = this.$store.getters.getHash('updates')
        console.log('load updates: ' + updates)
        return updates
      },
      options: function () {
        var searchOptions = this.searchOptions
        searchOptions.picked = this.scheduled
        return searchOptions
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
