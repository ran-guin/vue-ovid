<template lang='pug'>
  span.disease-section
    div.block
      div.block-header
        Demo(:demo="demo" name='disease')
        h3 Patient Coverage
          span(v-if="status==='loaded'")
            Modal(id='cov-modal' type='search' :links="links" :options="search_modal" :picked="coverage" closeButton="Finished adding Coverage")
          span(v-else)
            b &nbsp; &nbsp; &nbsp loading... 
      div.block-body
        div(v-if="coverage && coverage.length")
          DataGrid.block-grid(:data="coverage" :options="data_options" :links="links")
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
  import Modal from './../Standard/Modal.vue'

  import config from '@/config.js'
  import axios from 'axios'

  export default {
    name: 'Disease',
    components: {
      Search,
      Demo,
      EditableText,
      DataGrid,
      Modal
    },
    data () {
      return {
        toggle: false,
        showModal: false,
        moreCoverage: [],
        body: '',
        custom_links: {
          'more info': 'info',
          'Cover Me': 'coverMe',
          'revert': 'revert'
        },
        links: {
          'more info': this.info,
          'Cover Me': this.coverMe,
          'revert': this.revert
        },
        data_options: {
          title: 'Current Coverage',
          fields: ['condition', 'vaccine', 'status'],
          addLinks: [
            { type: 'button', name: 'Cover Me' },
            { type: 'button', name: 'more info', modal: { title: 'Vaccine Details', onPick: this.info, openButton: '?' } }
          ]
        },
        info_modal: {
          type: 'block',
          title: 'Details',
          header: 'Info header',
          body: 'info...',
          openButton: 'Info',
          closeButton: 'Close info',
          toggle: false
        },
        search_modal: {
          type: 'search',
          search: {
            scope: 'disease',
            method: 'get',
            url: config.diseaseMirrorURL,
            prompt: 'Check Protection',
            title: 'Disease Coverage',
            field: 'name',
            search_fields: ['name', 'description'],
            show_fields: ['condition', 'vaccine', 'expiry', 'taken', 'status'],
            onPick: this.addCoverage,
            multiSelect: true,
            target: 'coverage'
          },
          openButton: 'Add C',
          closeButton: 'close C',
          show: false,
          title: 'Original Title',
          data: {
            title: 'Current Coverage',
            fields: ['condition', 'vaccine', 'status'],
            addLinks: [{type: 'button', name: 'More info', modal: { onPick: this.info, openButton: '?' }}]
          }
        },
        msg: 'Disease message',
        diseaseString: '',
        Cover: { 'Cover': this.scheduleProtection },
        userURL: config.userURL,
        diseaseUrl: config.diseaseMirrorURL,
        helpList: ['schedule coverage for patients', 'check for contraindications', 'check for side effects', 'check for recommendations'],
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
    created: function () {
      this.$store.commit('defineLinks', this.links)
    },
    computed: {
      dlinks: function (name) {
        return this[name]
      },
      status: function () {
        return this.$store.getters.getStatus
        // return 'init'
      },
      coverage: function () {
        var C = this.$store.getters.getHash('coverage') || []
        console.log('load Coverage: ' + JSON.stringify(C))
        return C
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
      info: function (record) {
        console.log('retrieve more info from record: ' + JSON.stringify(record))
        var url = 'http://localhost:1234/lookup/user'

        var _this = this
        axios({url: url, method: 'get'})
        .then(function (result, err) {
          if (err) {
            console.log('error loading data')
            return false
          }
          console.log('connected via ' + url)
          console.log('axios returned value(s): ' + JSON.stringify(result))

          var data = result.data
          _this.$store.dispatch('setModalData', data)
          _this.$store.getters.toggleModal('info-modal')
        })
      },
      coverMe: function (record) {
        console.log('add record to schedule')
        console.log(JSON.stringify(record))
        this.$store.commit('setError', {context: 'update', err: 'Updated record', clear: true})
      },
      revert: function (key) {
        this.modal = this.previous_modal
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
