<template lang='pug'>
  span.schedule-section
    div.block
      div.block-header
        Demo(:demo="demo" name='vaccine')
        h3 Vaccinations Scheduled
          SearchModal(id='schedule-modal' type='search' :options="searchOptions" close="Close Scheduler" openButton="+")
      div.block-body
        div(v-if="scheduled && scheduled.length")
          DataGrid.block-grid(:data="scheduled" :data_options="data_options")
        div(v-else)
          b Nothing Scheduled
        div(v-if="help")
          Block(:content="help") 
      div.block-footer(v-if="footer")
        div(v-html="footer")
</template>

<script>
  import SearchModal from './../Standard/Modal.vue'
  import DataGrid from './../Standard/DataGrid.vue'
  import Block from './../Standard/Block.vue'
  import SearchBlock from './../Standard/SearchBlock.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'
  
  export default {
    name: 'schedule',
    components: {
      SearchModal,
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

        data_options: {
          addLinks: [
            {type: 'button', name: 'Immunize Me', modal: {function: this.ImmunizePatient, table: 'immunize', button: 'Save Immunization Rec', close: 'Cancel'}},
            {type: 'button', name: 'more info', modal: {function: this.MoreInfo}}
          ]
        },
        searchOptions: {
          scope: 'vaccine',
          model: 'vaccine',
          method: 'get',
          url: config.vaccineSearchURL,
          prompt: 'Search Vaccines',
          title: 'Immunizations',
          field: 'product_name',
          fields: ['product_name', 'din'],
          onPick: this.addCoverage,
          multiSelect: true
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
      scheduled: {
        type: Array
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
      MoreInfo: function (data) {
        console.log('get more info')
        console.log(JSON.stringify(data))
      },
      toggleMe: function () {
        this.toggle = !this.toggle
      }
    },
    computed: {
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
