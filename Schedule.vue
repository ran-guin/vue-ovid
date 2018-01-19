<template lang='pug'>
  span.schedule-section
    div.block
      div.block-header
        Demo(:demo="demo" name='vaccine')
        h3 Vaccinations Scheduled
          b &nbsp; &nbsp;
          Modal(id='schedule-modal' type='search' :options="search_modal" :picked="coverage" :onDelete='deleteItem')
          Modal(id='immunize-modal' type='record' :options="immunize_options" :append="append")
      div.block-body
        div(v-if="1")
          DataGrid.block-grid(:options="data_options" :links="links" baseClass='scheduled' fieldClass='status')
        div(v-else)
          b Nothing Scheduled
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
          title: 'Scheduled Immunizations',
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
          search: {
            scope: 'coverage',
            model: 'coverage',
            method: 'get',
            url: config.coverageMirrorUrl,
            prompt: 'Search Vaccines',
            field: 'vaccine',
            search_fields: ['vaccine', 'code', 'coverage'],
            show_fields: ['vaccine', 'code', 'coverage', 'status'],
            // onPick: this.addCoverage,
            multiSelect: true,
            target: 'coverage',
            picked: this.coverage,
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
          this.$set(this.append, 1, {name: 'vaccinator', type: 'int', default: staffId})
        }

        console.log('MD: ' + JSON.stringify(this.$store.getters.ModalData))
        this.$store.commit('appendModal', record)
        // this.$store.dispatch('setModalData', data)
        this.$store.getters.toggleModal('immunize-modal')
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
        console.log('to: ' + JSON.stringify(this.coverage))
      },
      deleteItem: function (index, key) {
        if (!key) { key = 'coverage' }
        console.log('DYNO: delete ' + key + ' item: ' + index)
        // this.$store.dispatch('deleteHashItem', {key: key, index: index})

        this.$store.commit('removeHashItem', {key: key, index: index})
      },
      info: function (record) {
        console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

        var data = [
          {'vaccine': 'Hepatitis B', 'side_effects': 'Pain at the injection site (3%-29%) and a temperature greater than 37.7 C (1%-6%) have been among the most frequently reported side effects among adults and children receiving vaccine (8-12). In placebo-controlled studies, these side effects were reported no more frequently among vaccinees than among persons receiving a placebo (11,12). Among children receiving both hepatitis B vaccine and DTP, these mild side effects have been observed no more frequently than among children receiving only DTP.', 'adverse_effects': 'In the United States, surveillance of adverse reactions indicated a possible association between GBS and receipt of the first dose of plasma-derived hepatitis B vaccine (CDC, unpublished data; 13). However, an estimated 2.5 million adults received one or more doses of recombinant hepatitis B vaccine during 1986-1990, and available data concerning these vaccinees do not indicate an association between receipt of recombinant vaccine and GBS (CDC, unpublished data).\n\nBased on reports to the Vaccine Adverse Events Reporting System (VAERS), the estimated incidence rate of anaphylaxis among vaccine recipients is low (i.e., approximately one event per 600,000 vaccine doses distributed). Two of these adverse events occurred in children (CDC, unpublished data). In addition, only one case of anaphylaxis occurred among 100,763 children ages 10-11 years who had been vaccinated with recombinant vaccine in British Columbia (D. Scheifele, unpublished data), and no adverse events were reported among 166,757 children who had been vaccinated with plasma-derived vaccine in New Zealand (5). Although none of the persons who developed anaphylaxis died, this adverse event can be fatal; in addition, hepatitis B vaccine can -- in rare instances -- cause a life-threatening hypersensitivity reaction in some persons (5). Therefore, subsequent vaccination with hepatitis B vaccine is contraindicated for persons who have previously had an anaphylactic response to a dose of this vaccine.\n\nLarge-scale hepatitis B immunization programs for infants in Alaska, New Zealand, and Taiwan have not established an association between vaccination and the occurrence of other severe adverse events, including seizures and GBS (B. McMahon and A. Milne, unpublished data; 14). However, systematic surveillance for adverse reactions in these populations has been limited, and only a minimal number of children have received recombinant vaccine. Any presumed risk for adverse events that might be causally associated with hepatitis B vaccination must be balanced with the expected risk for hepatitis B virus (HBV)-related liver disease. Currently, an estimated 2,000-5,000 persons in each U.S. birth cohort will die as a result of HBV-related liver disease because of the 5% lifetime risk for HBV infection.\n\nAs hepatitis B vaccine is introduced for routine vaccination of infants, surveillance for vaccine-associated adverse events will continue to be an important part of the program despite the current record of safety. Any adverse event suspected to be associated with hepatitis B vaccination should be reported to VAERS. VAERS forms can be obtained by calling (800) 822-7967'}
        ]

        this.$store.dispatch('setModalData', data)
        this.$store.getters.toggleModal('info-modal')
      }
    },
    computed: {
      coverage: function () {
        var C = this.$store.getters.getHash('coverage')
        var S = []
        // console.log('loaded Coverage: ' + JSON.stringify(C))
        // for (var i = 0; i < C.length; i++) {
        //   if (C[i].status && C[i].status === 'covered') {
        //     S.push(C[i])
        //   }
        // }
        console.log('loaded Schedule:' + JSON.stringify(S))
        return C
      },
      updates: function () {
        var updates = this.$store.getters.getHash('updates')
        console.log('load updates: ' + updates)
        return updates
      },
      options: function () {
        var searchOptions = this.searchOptions
        searchOptions.picked = this.coverage
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
  .scheduled.covered {
    background-color: red;
    /*display: none;*/
  }
  .scheduled.due {
    background-color: yellow;
  }
  .scheduled.recommended {
    background-color: yellow;
  }
  .scheduled.pending {
    background-color: yellow;
  } 
  .scheduled.questions {
    background-color: lightgreen;
  }
  .scheduled.mandatory {
    background-color: yellow;
    color: red !important;
    font-weight: bold !important;
  }
  .scheduled.mandatory a {
    color: red !important;
    font-weight: bold !important;
  }
</style>
