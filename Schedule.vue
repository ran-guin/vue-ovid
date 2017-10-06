<template lang='pug'>
  span.schedule-section
    Demo(:demo="demo" name='vaccine')
    Block(title="Scheduled Vaccines" subheader="[available to staff]" :trigger="toggleMe" :data="scheduled" :data_options="data_options" :alt="help")
    SearchModal(:picked="scheduled" :search_options="search_options" close="Finished adding Immunizations" :toggle="toggle")
</template>

<script>
  import SearchModal from './../Standard/SearchModal.vue'
  import Block from './../Standard/Block.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'
  
  export default {
    name: 'schedule',
    components: {
      SearchModal,
      Demo,
      Block
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
        search_options: {
          scope: 'vaccine',
          method: 'get',
          url: config.vaccineSearchURL,
          prompt: 'Search Vaccines',
          title: 'Immunizations',
          field: 'name',
          fields: ['product_name', 'din'],
          onPick: this.addCoverage,
          multiSelect: true
        },
        help: 'Schedule Specific Vaccines for Immunization<P /><UL><LI>Search for Vaccines</LI><LI>Check for Side-effects / Contra-indications</LI></UL>',
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
