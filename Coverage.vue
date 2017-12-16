<!--

 Coverage:

  Enable searching by disease coverage with acccess to disease based information links

  Customizations:
    fields included in search / display dataa:
      fields
      show_fields

    also the following fields usied for searching (may map external field names to displayed fields in myState)
    (eg .. if searching by 'name' in the url, but data to be shown as 'disease':
        defined: state.hash_map.coverage = {disease: 'name'}  in myState)

      field
      search_fields

  info_modal defined parameters for generating dynamic information modal
  search_modal defines parameter for modal used to search for additional coverage
  data_options define options for DataGrid generated to display current coverage

-->
<template lang='pug'>
  span.disease-section
    div.block
      div.block-header
        Demo(:demo="demo" name='disease')
        h3 Patient Coverage
          span(v-if="status==='loaded'")
            b &nbsp; &nbsp;
            Modal(id='cov-modal' type='search' :links="links" :options="search_modal" :picked="coverage")
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
  // import axios from 'axios'

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
        links: {
          '?': this.info
        },
        data_options: {
          title: 'Current Coverage',
          fields: ['coverage', 'vaccine', 'status'],
          baseClass: 'coverage',
          fieldClass: 'status',
          addLinks: [
            // { type: 'button', name: 'Schedule It', function: this.scheduleIt },
            { type: 'button', name: '?', modal: { title: 'Vaccine Details', onPick: this.info, openButton: 'v info' } }
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
          openButton: '+',
          closeButton: 'Done adding coverage',
          show: false,
          title: 'Original Title',
          search: {
            scope: 'disease',
            method: 'get',
            url: config.diseaseMirrorURL,
            prompt: 'Check Protection',
            title: 'Disease Coverage',
            field: 'name',
            search_fields: ['name', 'description'],
            show_fields: ['coverage', 'vaccine', 'expiry', 'taken', 'status'],
            onPick: this.addCoverage,
            multiSelect: true,
            target: 'coverage'
          },
          data: {
            title: 'Current Coverage',
            fields: ['coverage', 'vaccine', 'status'],
            addLinks: [{ type: 'button', name: 'More info', modal: { onPick: this.info, openButton: '?' } }]
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

        var data = [
          {'vaccine': 'Hepatitis B', 'side_effects': 'Pain at the injection site (3%-29%) and a temperature greater than 37.7 C (1%-6%) have been among the most frequently reported side effects among adults and children receiving vaccine (8-12). In placebo-controlled studies, these side effects were reported no more frequently among vaccinees than among persons receiving a placebo (11,12). Among children receiving both hepatitis B vaccine and DTP, these mild side effects have been observed no more frequently than among children receiving only DTP.', 'adverse_effects': 'In the United States, surveillance of adverse reactions indicated a possible association between GBS and receipt of the first dose of plasma-derived hepatitis B vaccine (CDC, unpublished data; 13). However, an estimated 2.5 million adults received one or more doses of recombinant hepatitis B vaccine during 1986-1990, and available data concerning these vaccinees do not indicate an association between receipt of recombinant vaccine and GBS (CDC, unpublished data).\n\nBased on reports to the Vaccine Adverse Events Reporting System (VAERS), the estimated incidence rate of anaphylaxis among vaccine recipients is low (i.e., approximately one event per 600,000 vaccine doses distributed). Two of these adverse events occurred in children (CDC, unpublished data). In addition, only one case of anaphylaxis occurred among 100,763 children ages 10-11 years who had been vaccinated with recombinant vaccine in British Columbia (D. Scheifele, unpublished data), and no adverse events were reported among 166,757 children who had been vaccinated with plasma-derived vaccine in New Zealand (5). Although none of the persons who developed anaphylaxis died, this adverse event can be fatal; in addition, hepatitis B vaccine can -- in rare instances -- cause a life-threatening hypersensitivity reaction in some persons (5). Therefore, subsequent vaccination with hepatitis B vaccine is contraindicated for persons who have previously had an anaphylactic response to a dose of this vaccine.\n\nLarge-scale hepatitis B immunization programs for infants in Alaska, New Zealand, and Taiwan have not established an association between vaccination and the occurrence of other severe adverse events, including seizures and GBS (B. McMahon and A. Milne, unpublished data; 14). However, systematic surveillance for adverse reactions in these populations has been limited, and only a minimal number of children have received recombinant vaccine. Any presumed risk for adverse events that might be causally associated with hepatitis B vaccination must be balanced with the expected risk for hepatitis B virus (HBV)-related liver disease. Currently, an estimated 2,000-5,000 persons in each U.S. birth cohort will die as a result of HBV-related liver disease because of the 5% lifetime risk for HBV infection.\n\nAs hepatitis B vaccine is introduced for routine vaccination of infants, surveillance for vaccine-associated adverse events will continue to be an important part of the program despite the current record of safety. Any adverse event suspected to be associated with hepatitis B vaccination should be reported to VAERS. VAERS forms can be obtained by calling (800) 822-7967'}
        ]

        this.$store.dispatch('setModalData', data)
        this.$store.getters.toggleModal('info-modal')

        // var url = 'http://localhost:1234/lookup/user'
        // var _this = this
        // axios({url: url, method: 'get'})
        // .then(function (result, err) {
        //   if (err) {
        //     console.log('error loading data')
        //     return false
        //   }
        //   console.log('connected via ' + url)
        //   console.log('axios returned value(s): ' + JSON.stringify(result))

        //   var data = result.data
        //   _this.$store.dispatch('setModalData', data)
        //   _this.$store.getters.toggleModal('info-modal')
        // })
      },
      // scheduleIt: function (record) {
      //   console.log('add record to schedule')
      //   console.log(JSON.stringify(record))

      //   this.$store.commit('squeezeHash', {key: 'schedule', record: record})

      //   this.$store.commit('setError', {context: 'update', err: 'Updated record', clear: true})
      // },
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

<style>
  .disease-section {

  }
  .coverage.covered {
    background-color: lightgreen;    
  }
  .coverage.recommended {
    display:none;
  }
  .coverage.expiring {
    background-color: yellow;        
  }
  .coverage.expired {
    background-color: pink;        
  }
  .coverage.due {
    display: none;
  } 
  .coverage.pending {
    display: none;
  }
/*  .block-body {
    padding: 20px;
    background-color: #eee;    
  } */
</style>
