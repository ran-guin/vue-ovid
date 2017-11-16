<template lang='pug'>
  span.disease-section
    div.block
      div.block-header
        Demo(:demo="demo" name='disease')
        h3 Patient Coverage
          SearchModal(id='cov-modal' :picked="coverage" :search_options="search_options" close="Finished adding Coverage" :toggle="toggle" openButton="+")
          <!-- TestModal -->
      div.block-body
        div(v-if="coverage && coverage.length")
          DataGrid.block-grid(:data="coverage" :data_options="data_options")
        div(v-else)
          b No Current Coverage
        div(v-if="help")
          EditableText(:content="help" :onClose="editText" :editable="payload.access==='editor'" scope='alt') 
      div.block-footer(v-if="footer")
        div(v-html="footer")
</template>

<script>
  import Search from './../Standard/Search.vue'
  import DataGrid from './../Standard/DataGrid.vue'
  import EditableText from './../Standard/EditableText.vue'
  import Demo from './Demo.vue'
  import SearchModal from './../Standard/SearchModal.vue'
  import TestModal from './../Standard/TestModal.vue'
  import config from '@/config.js'

  export default {
    name: 'Disease',
    components: {
      Search,
      Demo,
      EditableText,
      DataGrid,
      SearchModal,
      TestModal
    },
    data () {
      return {
        toggle: false,
        showModal: false,
        moreCoverage: [],
        search_options: {
          scope: 'disease coverage',
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
        helpList: ['schedule coverage for patients', 'check for contraindications', 'check for side effects', 'check for recommendations'],
        data_options: {title: 'Current Coverage'},
        footer: ''
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
    computed: {
      coverage: function () {
        return this.$store.getters.getCoverage
      },
      title: function () {
        var t = 'Disease Coverage'
        if (this.payload && this.payload.patient) {
          return t + ' for ' + this.payload.patient.name
        } else {
          return t
        }
      },
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
        return '<p ><UL><LI>' + this.helpList.join('</LI><LI>') + '</LI></UL>'
      }
    },
    methods: {
      openModal: function () {
        console.log('open modal...')
        console.log('fade in')
        this.showModal = true;
        document.getElementById('modal-template').classList.toggle('m-fadeIn')
      },
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
        // if (this.toggle) {
        //   console.log('fade out')
        //   document.getElementById('searchModal').classList.toggle('m-fadeOut')
        // } else {
        //   console.log('fade in')
        //   document.getElementById('searchModal').classList.toggle('m-fadeIn')
        // }
      },
      editText (newContent, scope) {
        if (!scope) { scope = 'content' }

        if (this.updateContent) {
          console.log('update content based on input prop function')
          this.updateContent(newContent)
        } else if (newContent === this[scope]) {
          console.log('no changes detected in ' + scope)
        } else {
          console.log(this[scope] + ' vs ' + newContent)
          console.log('require input prop function updateContent to update content')

          this.$store.commit('setError', {context: 'update', err: 'no update function supplied to affect content', clear: true})
        }
      }
    }
  }
</script>

<style scoped>
  .disease-section {

  } 
/*  .block-body {
    padding: 20px;
    background-color: #eee;    
  } */
</style>
