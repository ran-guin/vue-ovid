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
      Messaging
      Modal(id='info-modal' :options="info_modal" :content="infoContent" :data="infoData" closeButton="Close" :toggle="info_modal.toggle")
      div.flexWrapper
        div.flexChild.mainBlock
          Coverage(:payload="payload")
        div.flexChild.mainBlock
          <!-- Schedule(:payload="payload") -->
      div.flexWrapper
        div.flexChild.mainBlock
            Travel(:payload="payload")
        div.flexChild.mainBlock
            History(:payload="payload")


    PublicFooter.footer

</template>

<script>
import Schedule from './Schedule.vue'
import Coverage from './Coverage'
import Travel from './Travel'
import History from './History.vue'

import Modal from './../Standard/Modal.vue'
import Messaging from './../Standard/Messaging.vue'

import PrivateHeader from './../PrivateHeader.vue'
import PublicFooter from './../PublicFooter.vue'

import config from '@/config.js'

export default {
  name: 'ovid',
  components: {
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
      menu: {options: ['dashboard', 'history', 'scheduled'], page: 'dashboard'},
      selectOne: { subject: { id: 0, name: '', details: {} }, name: 'TBD', id: 0, label: {}, status: 'search' },
      demo: false,
      info_modal: {
        type: 'block',
        title: 'Details... ',
        header: 'Info header',
        body: 'info...',
        openButton: 'Info',
        closeButton: 'Close info',
        toggle: false
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
    }
  },
  methods: {
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
</style>
