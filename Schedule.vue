<template lang='pug'>
  span.schedule-section
    div.block
      div.block-header
        Demo(:demo="demo" name='vaccine')
        h3 Pending Immunizations
          b &nbsp; &nbsp;
          Modal(id='schedule-modal' type='search' :options="search_modal" :picked="scheduled" :onDelete='deleteItem')
          Modal(id='immunize-modal' type='record' :options="immunize_options" :append="append")
          span &nbsp; &nbsp; 
          hr
          div
            div.input-group
              span.input-group-addon
                icon(name='barcode')
              input.form-control(type='text' placeholder='-- Scan Barcode --')
              span.input-group-btn
                button.btn.btn-primary(@click.prevent='scanBarcode') Apply
              span &nbsp; &nbsp; 
      div.block-body
        div(v-if="1")
          DataGrid.block-grid(:data="scheduled" :options="data_options" :links="links" baseClass='scheduled' fieldClass='status')
        div(v-else)
          b Nothing Required
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

  import 'vue-awesome/icons/barcode'

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
        append: [],
        links: {
        },
        data_options: {
          title: 'Pending Immunizations',
          stored: 'coverage',
          fields: ['vaccine', 'coverage', 'status'],
          baseClass: 'scheduled',
          fieldClass: 'status',
          addLinks: [
            {type: 'button', name: 'Immunize Me', closeButton: 'Finished Immunization', modal: {onPick: this.immunizePatient}},
            {type: 'button', name: 'more info', modal: {onPick: this.info}}
          ]
        },
        immunize_options: {
          access_type: 'append',
          table: 'immunize',
          close: 'Cancel',
          toggle: false,
          onSave: this.saveImmunization
        },
        search_modal: {
          type: 'search',
          title: 'Immunizations',
          openButton: '+',
          closeButton: 'Close Scheduler',
          data_options: {
            fields: ['vaccine', 'coverage', 'expiry']
          },
          search: {
            scope: 'coverage',
            model: 'coverage',
            method: 'get',
            url: config.coverageMirrorUrl,
            prompt: 'Search Vaccines',
            field: 'vaccine',
            search_fields: ['vaccine', 'code', 'coverage'],
            show_fields: ['vaccine', 'code', 'coverage', 'expiry'],
            // onPick: this.addCoverage,
            multiSelect: true,
            target: 'coverage',
            picked: this.scheduled,
            onPick: this.addSchedule,
            stored: 'coverage'
          },
          data: {
            onDelete: this.deleteItem,
            stored: 'coverage'
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
      },
      cov: {
        type: Array
      }
    },
    methods: {
      scanBarcode: function (record) {
        console.log('scan barcode...')
        record = { lot: 'lot number retrieved from barcode ...' }
        this.$set(this.append, this.append.length, {name: 'lot', type: 'hidden', default: 'lot number retrieved from barcode ...'})
        // this.$set(this.append, this.append.length, {name: 'vaccine', type: 'hidden', default: 'Rabies'})

        record.vaccine = 'RaBies [eg...decoded from barcode]'
        record.id = 5
        this.immunizePatient(record)
      },
      immunizePatient: function (record) {
        console.log('Immunize Me With ')
        console.log('retrieve more info from record: ' + JSON.stringify(record))

        this.$store.commit('clearErrors')

        var payload = this.$store.getters.getHash('payload')
        console.log('payload: ' + JSON.stringify(payload))

        var patientId, staffId
        if (payload && payload.patient) {
          patientId = payload.patient.id
          staffId = payload.staff.id

          this.$set(this.append, 0, {name: 'patient', type: 'hidden', default: patientId})
          this.$set(this.append, 1, {name: 'vaccinator', type: 'hidden', default: staffId})

          this.$set(this.append, 1, {name: 'vaccine_id', type: 'hidden', default: record.id})
          this.$store.commit('setHash', {key: 'modalTitle', value: 'Immunize with ' + record.vaccine + ' Vaccine'})

          // this should replace use of this.append above...?? or vice versa ..
          // this.$store.commit('setHash', {
          //   key: 'form',
          //   value: [
          //     { name: 'patient', default: patientId, type: 'hidden' },
          //     { name: 'vaccinator', default: staffId, type: 'hidden' },
          //     { name: 'vaccine_id', default: record.vaccine, type: 'hidden' }
          //   ]
          // })
          console.log('Immunize with ' + record.vaccine)
        }
        // this.$store.$set(this.form, key, val)
        // this.$store.dispatch('setModalData', data)
        this.$store.dispatch('toggleModal', 'immunize-modal')
      },
      saveImmunization: function (record) {
        console.log('save immunization record...')
        console.log(JSON.stringify(record))

        this.$store.commit('squeezeHash', {key: 'history', record: record})

        var msgReturned = 'saved immunization record'
        this.$store.commit('logMessage', { message: msgReturned })
      },
      addSchedule: function (data) {
        // UNNECESSARY ... doesn't need to do anything ...
        console.log('DYNO: add Schedule')
        console.log(JSON.stringify(data))
        console.log('to: ' + JSON.stringify(this.scheduled))
      },
      deleteItem: function (index, key) {
        if (!key) { key = 'coverage' }
        console.log('DYNO: delete ' + key + ' item: ' + index)
        // this.$store.dispatch('deleteHashItem', {key: key, index: index})

        this.$store.commit('removeHashItem', {key: key, index: index})
      },
      info: function (record) {
        console.log('retrieve more schedule info from record: ' + JSON.stringify(record))
        var data = record
        data.recommendations = '... more details retrieved dynamically via CDC API ...'
        data.side_effects = '... more details retrieved dynamically via CDC API ...'
        data.contraindications = '... more details retrieved dynamically via CDC API ...'
        data.link = '... link to cdc site for more information'

        // this.$store.dispatch('setModalData', data, {spin: true})
        this.$store.commit('setHash', { key: 'info-modal', value: data })

        this.$store.getters.toggleModal('info-modal')
      }
    },
    computed: {
      scheduled: function () {
        var C = this.$store.getters.getHash('coverage')
        var S = []
        console.log('loaded Coverage: ' + JSON.stringify(C))
        for (var i = 0; i < C.length; i++) {
          if (C[i].status && !C[i].status.match(/covered|expired/)) {
            S.push(C[i])
          }
        }
        console.log('loaded Schedule:' + JSON.stringify(S))
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

<style>
  .schedule {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }
</style>
