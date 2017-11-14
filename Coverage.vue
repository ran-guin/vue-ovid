<template lang='pug'>
  span.disease-section
    Demo(:demo="demo" name='disease')
    b P: {{payload}}
    Block(title="Disease Coverage" :trigger="toggleMe" subheader="[available to these users & staff]" :data="coverage" :alt="help")
    SearchModal(:picked="coverage" :search_options="search_options" close="Finished adding Coverage" :toggle="toggle")
</template>

<script>
  import Search from './../Standard/Search.vue'
  import Demo from './Demo.vue'
  import Block from './../Standard/Block.vue'
  import SearchModal from './../Standard/SearchModal.vue'
  import config from '@/config.js'
  // import _ from 'lodash'

  export default {
    name: 'Disease',
    data () {
      return {
        toggle: false,
        coverage: [],
        moreCoverage: [],
        search_options: {
          scope: 'disease',
          method: 'get',
          url: config.diseaseURL,
          prompt: 'Check Protection',
          title: 'Disease Coverage',
          field: 'name',
          fields: ['name', 'description'],
          onPick: this.addCoverage,
          multiSelect: true
        },
        msg: 'Disease message',
        diseaseString: '',
        Cover: { 'Cover': this.scheduleProtection },
        userURL: config.userURL,
        diseaseUrl: config.diseaseUrl,
        addLinks: [
          {type: 'button', name: 'Cover Me', modal: {function: this.CoverPatient, table: 'Cover', button: 'Schedule Protection', close: 'Cancel'}},
          {type: 'button', name: 'more info', function: this.MoreInfo}
        ],
        helpList: ['schedule coverage for patients', 'check for contraindications', 'check for side effects', 'check for recommendations']
      }
    },
    props: {
      demo: {
        type: Boolean,
        default: false
      },
      diseases: {
        type: Array
      },
      payload: {
        type: Object
      }
    },
    components: {
      Search,
      Demo,
      Block,
      SearchModal
    },
    computed: {
      admin: function () {
        if (this.payload && this.payload.access === 'admin') {
          return true
        } else {
          return false
        }
      },
      contents: function () {
        if (this.coverage && this.coverage.length) {
          return 'coverage'
        } else {
          return this.help
        }
      },
      help: function () {
        return '<b>no current coverage</b><p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
      }
    },
    methods: {
      addCoverage: function (data) {
        // UNNECESSARY ... doesn't need to do anything ...
        console.log('add Coverage')
        console.log(JSON.stringify(data))
        console.log('to: ' + JSON.stringify(this.coverage))

        // var cover = data[0]
        // var existing = _.map(this.coverage, 'name').indexOf(cover.name)
        // var adding = _.map(this.moreCoverage, 'name').indexOf(cover.name)

        // if (existing === -1) {
        //   cover.status = 'scheduled'
        //   this.coverage.push(cover)
        //   console.log('add coverage for ' + cover.name)

        //   if (adding === -1) {
        //     cover.status = 'scheduled'
        //     this.moreCoverage.push(cover)
        //     console.log('add more coverage for ' + cover.name)
        //   } else {
        //     this.coverage[adding].status = this.coverage[adding].status || 'scheduled'
        //     console.log(cover.name + ' already scheduled')
        //   }
        // } else {
        //   this.coverage[existing].status = this.coverage[existing].status || 'scheduled'
        //   console.log(cover.name + ' already covered')
        //   console.log(JSON.stringify(this.coverage[existing]))
        // }
        console.log('* Add COVERAGE: ' + JSON.stringify(this.moreCoverage))
        console.log('* SCHEDULED COVERAGE: ' + JSON.stringify(this.coverage))
      },
      scheduleProtection: function (disease) {
        console.log('schedule Coverage for ' + disease)
      },
      toggleMe: function () {
        this.toggle = !this.toggle
      }
    }
  }
</script>

<style scoped>
  .disease-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    /*border: 1px solid black;*/
    padding: 10px;
  }  
</style>
