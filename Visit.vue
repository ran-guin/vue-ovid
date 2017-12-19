<!--         div.flexChild.mainBlock
            Schedule(:payload="payload")
              div.flexWrapper
                div.flexChild.mainBlock
                    Travel(:payload="payload")
                div.flexChild.mainBlock
                    History(:payload="payload")
-->
<template lang='pug'>
  div
    PrivateHeader.header(:payload="payload" :demo="demo")
    div.body.container
      Patient(:patient="demoPatient")
      Messaging
          
      p &nbsp;

      div.col-md-3.coverageBlock
          b Current Status:
          <!-- div.flexWrapper -->
          DataGrid.block-grid(:data="coverage" :options="coverage_options")
          p &nbsp;
          DataGrid.block-grid(:data="coverage" :options="pending_options")
          p &nbsp;
          DataGrid.block-grid(:data="travel" :options="travel_options")
          p &nbsp;
      div.col-md-9.mainBlock
        b
          span.mainSection
            <!-- a(href='#' @click.prevent="toggleVisibility('coveredBlock')") Covered -->
            a(href='#' @click.prevent="show='covered'") Covered
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('ScheduledBlock')") Scheduled -->
            a(href='#' @click.prevent="show='scheduled'") Scheduled
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('TravelBlock')") Travel -->
            a(href='#' @click.prevent="show='travel'") Travel
            span &nbsp; &nbsp;
            <!-- a(href='#' @click.prevent="toggleVisibility('HistoryBlock')") History -->
            a(href='#' @click.prevent="show='history'") History
            span &nbsp; &nbsp;
            
          Modal(id='info-modal' :options="info_modal" :content="infoContent" :data="infoData")

          div(v-if="show==='covered'")
            div.mainSection#coveredBlock
              Coverage(:payload="payload")
          div(v-if="show==='scheduled'")
            div.mainSection#ScheduledBlock
              Schedule(:payload="payload")
          div(v-if="show==='travel'")
            div.mainSection#TravelBlock
              Travel(:payload="payload")
          div(v-if="show==='history'")
            div.mainSection#HistoryBlock
              History(:payload="payload")


        <!-- Schedule(:payload="payload") -->


    PublicFooter.footer

</template>

<script>
import Patient from './Patient.vue'

import Schedule from './Schedule.vue'
import Coverage from './Coverage'
import Travel from './Travel'
import History from './History.vue'

import DataGrid from './../Standard/DataGrid.vue'

import Modal from './../Standard/Modal.vue'
import Messaging from './../Standard/Messaging.vue'

import PrivateHeader from './../PrivateHeader.vue'
import PublicFooter from './../PublicFooter.vue'

import config from '@/config.js'

export default {
  name: 'ovid',
  components: {
    DataGrid,
    Patient,
    Schedule,
    Coverage,
    Travel,
    History,
    Messaging,
    Modal,
    PrivateHeader,
    PublicFooter
  },
  data () {
    return {
      show: 'scheduled',
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      demo: false,
      defaultBlock: 'coveredBlock',
      coverage_options: {
        fields: ['coverage'],
        title: 'Covered',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'coverage',
        fieldClass: 'status'
      },
      pending_options: {
        fields: ['coverage'],
        title: 'Pending',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'scheduled',
        fieldClass: 'status'
      },
      travel_options: {
        fields: ['country', 'subregion'],
        title: 'Travel Plans',
        // fields: ['coverage', 'vaccine', 'status'],
        baseClass: 'coverage',
        fieldClass: 'status'
      },

      info_modal: {
        type: 'block',
        title: 'Details... ',
        header: 'Info header',
        body: 'info...',
        closeButton: 'Close info',
        toggle: false
      },
      demoPatient: {
        name: 'Brian Foster',
        id: 2,
        birthdate: '1964-11-27',
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
    this.$store.commit('definePayload', payload)

    console.log('loaded patient...')
    var patient = payload.patient
    console.log('ok')
    console.log('patient: ' + JSON.stringify(patient))

    this.$store.getters.defaultBlock(this.defaultBlock)
  },
  computed: {
    status: function () {
      return this.$store.getters.getStatus
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
      var C = this.$store.getters.getHash('coverage') || []
      console.log('load Coverage: ' + JSON.stringify(C))
      return C
    },
    travel: function () {
      var T = this.$store.getters.getHash('travel') || []
      console.log('load travel data' + T)
      return T
    }
  },
  methods: {
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
}
.header {
  height: 80px;
  background-color: #ccc;
}
.footer {
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
   {
  /*  visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 1000ms, opacity 1000ms;
*/
    display: none;
 /*   opacity: 0;
    transition: opacity 1s, height 0 1s;
    height: 0;*/
  }
  .b-fadeIn {
  /*  visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 1000ms;
*/
    display: block;
/*    opacity: 1;
    transition: opacity 1s, height 0;
*/  }

</style>
