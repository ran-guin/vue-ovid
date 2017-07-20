import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    count: 1,
    patient: {id: null, name: null},
    vaccine: {id: null, name: null},
    disease: {id: null, name: null},
    scheduled: [],
    selected: [1, 2, 3],
    foundRecords: {},
    searchResults: { patient: [], vaccine: [] }
  },
  mutations: {
    increment (state) {
      state.count++
      state.count++
    },
    searchUsers (state, string) {
      console.log('found user... ' + string)
      state.patient.id = 4
      state.patient.name = 'Ran'
      state.selected.push({model: 'patient', id: 4})
    },
    clearUser (state) {
      console.log('clear ' + state.patient.name)
      state.patient.id = null
      state.patient.name = null
    },
    found_patients (state, data) {
      if (!data) { data = {} }
      console.log('get patient search results')
      state.searchResults.patient = data
    },
    stashResults (state, results) {
      if (results.constructor === Object && results.scope) {
        console.log('stashing ' + results.scope + ' results with scope: ' + JSON.stringify(results.data))
        state.searchResults[results.scope] = results.data
        state.foundRecords[results.scope] = results.data.length
      } else {
        console.log('general results: ' + JSON.stringify(results))
        state.searchResults.data = results
        state.foundRecords.data = results.length
      }
    },
    found (state, count) {
      console.log('found ' + count + ' records')
      state.foundRecords = count
    },
    searchVaccines (state, string) {
      console.log('found vaccine(s)/disease(s): ' + string)
      state.vaccine.id = 3
      state.vaccine.name = 'MMR'
    }
  }
})

