<template lang='pug'>
  div
    PrivateHeader.header(:payload="payload" :demo="demo")
    div.body.container
      Patient(:patient="demoPatient")
      Messaging
      hr
      Legend(:keys='legendKeys' baseClass='result-row result-cell')
      div.col-md-3.coverageBlock
          b Current Status:
          <!-- div.flexWrapper -->
          DataGrid.block-grid(:data="coverage" :options="coverage_options")
          p &nbsp;
          DataGrid.block-grid(:data="pending" :options="pending_options")
          p &nbsp;
          DataGrid.block-grid(:data="travel" :options="travel_options")
          p &nbsp;
      div.col-md-9.mainBlock
        b
          span.mainSection
            <!-- a(href='#' @click.prevent="toggleVisibility('coveredBlock')") Covered -->
            a(href='#' @click.prevent="show='covered'") Diseases
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('ScheduledBlock')") Scheduled -->
            a(href='#' @click.prevent="show='scheduled'") Vaccines
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('TravelBlock')") Travel -->
            a(href='#' @click.prevent="show='travel'") Travel
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('HistoryBlock')") History -->
            a(href='#' @click.prevent="show='history'") History
            span &nbsp; &nbsp;

            a(href='#' @click.prevent="show='upload'") Upload
            span &nbsp; &nbsp;
          Modal(id='info-modal' :options="info_modal" :content="infoContent" :data="infoData")

          div(v-if="show==='covered'")
            div.mainSection#coveredBlock
              Coverage(:payload="payload")
          div(v-if="show==='scheduled'")
            div.mainSection#ScheduledBlock
              Schedule(:payload="payload" :cov="coverage")
          div(v-if="show==='travel'")
            div.mainSection#TravelBlock
              Travel(:payload="payload")
          div(v-if="show==='history'")
            div.mainSection#HistoryBlock
              History(:payload="payload")
          div(v-if="show==='upload'")
            div.mainSection#UploadBlock
              Upload()

          <!-- Schedule(:payload="payload") -->
    PublicFooter.footer
</template>

<script>
import Patient from './Patient.vue'

import Schedule from './Schedule.vue'
import Coverage from './Coverage'
import Travel from './Travel'
import History from './History.vue'

import Upload from './../Standard/Upload.vue'

import DataGrid from './../Standard/DataGrid.vue'

import Modal from './../Standard/Modal.vue'
import Messaging from './../Standard/Messaging.vue'
import Legend from './../Standard/Legend.vue'

import PrivateHeader from './PrivateHeader.vue'
import PublicFooter from './PublicFooter.vue'

import config from '@/config.js'

import 'vue-awesome/icons/check-circle'
import 'vue-awesome/icons/warning'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/edit'
import 'vue-awesome/icons/close'
import 'vue-awesome/icons/question-circle'

export default {
  name: 'ovid',
  components: {
    DataGrid,
    Patient,
    Schedule,
    Coverage,
    Travel,
    History,
    Upload,
    Messaging,
    Legend,
    Modal,
    PrivateHeader,
    PublicFooter
  },
  data () {
    return {
      legendKeys: ['covered', 'expiring', 'expired', 'pending'],
      show: 'scheduled',
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      demo: false,
      defaultBlock: 'coveredBlock',
      coverage_options: {
        fields: ['vaccine', 'coverage'],
        title: 'Covered',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'coverage',
        fieldClass: 'status',
        addLinks: [ { type: 'icon', name: 'check-circle', colour: 'blue', modal: { onPick: this.info, openButton: '?' } } ]
      },
      pending_options: {
        fields: ['vaccine', 'coverage'],
        title: 'Required / Recommended',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'scheduled',
        fieldClass: 'status',
        addLinks: [ { type: 'icon', name: 'warning', colour: 'black', modal: { onPick: this.info, openButton: '?' } } ]
      },
      travel_options: {
        fields: ['country', 'subregion'],
        title: 'Travel Plans',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'coverage',
        fieldClass: 'status',
        addLinks: [ { type: 'icon', name: 'check-circle', colour: 'blue', modal: { onPick: this.info, openButton: '?' } } ]
      },

      info_modal: {
        key: 'info-modal',
        type: 'block',
        title: 'Details... ',
        header: 'Info header',
        body: 'info...',
        closeButton: 'Close info',
        toggle: false,
        data_options: {listBy: 'column'}
      },
      demoPatient: {
        name: 'John Doe',
        id: 2,
        birthdate: '1984-11-27',
        identifier: 'BCN123456',
        identifier_type: 'PHN'
      }
    }
  },
  props: {
    page: {
      type: String,
      default: 'dashboard'
    }
  },
  events: {
    'incremented': function () {
      console.log('caught in visit')
    }
  },
  created: function () {
    console.log('Initialize visit...')
    var payload = config.demo_payload
    var coverage = config.demo_coverage
    var travel = config.demo_travel

    console.log('payload: ' + JSON.stringify(payload))
    this.$store.commit('setHash', {key: 'payload', value: payload})

    var showPayload = this.$store.getters.getHash('payload')
    console.log('payload: ' + JSON.stringify(showPayload))

    console.log('define hash...')
    this.$store.commit('defineHash', {
      key: 'coverage',
      defaults: {status: 'pending'},
      map: {coverage: 'name'},
      fields: ['id', 'coverage', 'vaccine', 'taken', 'recommendationLevel', 'expiry', 'status']
    })
    console.log('load coverage...' + JSON.stringify(coverage))

    // clear hash since temporarily loaded from config..
    this.$store.commit('setHash', {key: 'coverage', value: []})
    this.$store.commit('setHash', {key: 'travel', value: []})

    for (var i = 0; i < coverage.length; i++) {
      this.$store.commit('squeezeHash', {key: 'coverage', record: coverage[i]})
    }

    console.log('load travel...')
    for (var k = 0; k < travel.length; k++) {
      this.$store.commit('squeezeHash', {key: 'travel', record: travel[k]})
    }

    console.log('loaded patient...')
    var patient = payload.patient
    console.log('ok')
    console.log('patient: ' + JSON.stringify(patient))

    this.$store.getters.defaultBlock(this.defaultBlock)

    this.$store.commit('setStatus', {coverage: 'loaded'})
  },
  computed: {
    status: function () {
      return this.$store.getters.getStatus('coverage')
      // return 'init'
    },
    infoData: function () {
      return this.$store.getters.modalData
    },
    infoContent: function () {
      return this.$store.getters.modalContent
    },
    payload: function () {
      var payload = this.$store.state.payload
      console.log('retrieved ' + JSON.stringify(payload))
      return payload
    },
    coverage: function () {
      console.log('modal Data in vc: ' + JSON.stringify(this.$store.getters.getHash('info-modal')))

      var C = this.$store.getters.getHash('coverage') || []
      var cov = []
      console.log('loaded Full Coverage: ' + JSON.stringify(C))
      for (var i = 0; i < C.length; i++) {
        if (C[i].status && C[i].status.match(/covered|expiring/)) {
          cov.push(C[i])
        }
      }
      console.log('loaded coverage for visit:' + JSON.stringify(cov))
      return cov
    },
    pending: function () {
      console.log('modal Data in vp: ' + JSON.stringify(this.$store.getters.getHash('info-modal')))
      var C = this.$store.getters.getHash('coverage') || []
      var pending = []
      for (var i = 0; i < C.length; i++) {
        if (C[i].status && !C[i].status.match(/covered|expired/)) {
          pending.push(C[i])
        }
      }
      console.log('loaded pending for visit:' + JSON.stringify(pending))
      return pending
    },
    travel: function () {
      var T = this.$store.getters.getHash('travel') || []
      console.log('load travel data' + T)
      return T
    }
  },
  methods: {
    info: function (record) {
      console.log('retrieve more coverage info from record: ' + JSON.stringify(record))
      var data = []

      if (record.country) {
        record.geography = '... geographical areas of concern within this region / subregion ...'
        record.recommendations = 'general travel recommendations for travel to ' + record.country
        record.importance = ' eg( optional, recommended or mandatory) ...'
        record.details = '... more details regarding travel to ' + record.country
      }
      data.push(record)
      // this.$store.dispatch('setModalData', data)
      this.$store.commit('setHash', {key: 'info-modal', value: data})
      this.$store.getters.toggleModal('info-modal')
      console.log('Visit info -> modal info' + JSON.stringify(this.$store.getters.getHash('info-modal')))
    },
    toggleVisibility: function (id) {
      this.$store.getters.toggleBlock(id)
      // this.$store.dispatch('hideActiveBlock')
      // .then(() => {
      //   this.$store.getters.showBlock(id)
      // })
    },
    find_user () {
      console.log('find me')
      this.msg = 'revised message '
    }
  }
}
</script>

<style>
.page {
  /*margin-top: -20px;*/
  height: 100%;
  width: 100%;
}
.body {
  min-height: calc(100vh - 150px);
  margin-bottom: 10px;
}
.header {
  height: 80px;
  background-color: #ccc;
}
.footer {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 15px;

  height: 70px;
  /*padding: 10px;*/
  background-color: #ccc;
}

  .body {
    height: auto;
  }
  
  .pageWrapper {
    margin: 0px;
  }

  .flexWrapper {
    display: flex;
    flex-flow: row no-wrap;
  }

  .flexChild {
    flex: 1;
    justify-content: space-around;
  }

  .mainBlock {
    padding: 20px;
    align-content: top;
  }

  .user-section, .scheduled-section, .coverage-section {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }

  .block {
    padding: 0px;
    /*border: 1px solid black;*/
    min-height: 200px;
  }
  .block-header {
    padding: 10px;
    background-color: #ccc;
  }
  .block-subheader {
    padding: 10px;
    background-color: #ddd;
  }
  .block-body {
    padding: 20px;
    background-color: #eee;
  }
  .block-footer {
    padding: 20px;
    background-color: '#eee';
  }
  .coverageBlock {
    border: solid black 3px;
    padding: 20px;
    min-width: 200px;
    max-width: 400px;
  }
  .mainBlock {
    border-top: solid black 3px;
    border-right: solid black 3px;
    padding: 20px;
    transition: opacity 1s ease;
  }
  .mainSection {
    transition: visibility 0s linear 0s, opacity 1000ms;
  }
  .result-row.covered, .result-row .covered {
    background-color: lightgreen;
    /*display: none;*/
  }
  .result-row.due, .result-row .due {
    background-color: yellow;
  }
  .result-row.expiring, .result-row .expiring {
    background-color: orange;
  }
  .result-row.expired, .result-row .expired {
    background-color: pink;
  }
  .result-row.recommended, .result-row .recommended {
    background-color: yellow;
  }
  .result-row.pending, .result-row .pending {
    background-color: yellow;
  } 
  .result-row.questions, .result-row .questions {
    background-color: lightgreen;
  }
  .result-row.mandatory, .result-row .mandatory {
    color: red !important;
    font-weight: bold !important;
  }

</style>
