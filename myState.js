import Vue from 'vue'
import Vuex from 'vuex'
import underscore from 'underscore'

Vue.use(Vuex)

// import StdState from './../Standard/StdState'
// const ovid = {

export default new Vuex.Store({
  state: {
    count: 1,
    patient: {id: null, name: null},
    vaccine: {id: null, name: null},
    disease: {id: null, name: null},
    scheduled: [],

    selected: [1, 2, 3],
    foundRecords: {},
    searchResults: { patient: [], vaccine: [] },
    picked: { patient: [], vaccine: [] },
    searchStatus: { patient: '', vaccine: '' },
    errors: []
  },
  mutations: {
    increment (state) {
      state.count++
      state.count++
    },
    clearUser (state) {
      console.log('clear ' + state.patient.name)
      state.patient.id = null
      state.patient.name = null
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

    selectOne (state, data) {
      if (data.scope && data.id) {
        state.picked[data.scope] = data.id
      }
    },
    unselectOne (state, data) {
      if (data.scope && data.id && state.picked[data.scope] && state.picked[data.scope].length) {
        const found = underscore.pluck(state.picked[data.scope], 'id').indexOf(data.id)
        state.picked[data.scope].splice(found, 1)
        console.log('found ' + found)
        console.log(JSON.stringify(state.picked[data.scope]))
      } else {
        console.log('not selected')
      }
    },
    selectOneMore (state, data) {
      if (data.scope && data.id) {
        if (state.picked[data.scope].length && underscore.pluck(state.picked[data.scope], 'id').indexOf(data.id) > -1) {
          console.log('already picked ' + data.id)
        } else {
          state.picked[data.scope].push({id: data.id, label: data.label})
        }
      }
    },

    clearSearchResults (state, data) {
      console.log('clear search results for ' + data.scope)
      state.searchResults[data.scope] = []
    },
    setSearchStatus (state, data) {
      console.log('set search status: ' + JSON.stringify(data))
      state.searchStatus[data.scope] = data.status
    },
    setError (state, err) {
      console.log('set Error: ' + err)
      if (err.constructor === Error && err.message) {
        state.errors.push(err.message)
      } else if (err.constructor === String) {
        state.errors.push(err)
      }
    },
    clearErrors (state, err) {
      console.log('clear errors...')
      state.errors = []
    }
  }

})
// }

// export default new Vuex.Store({
//   modules: {
//     ovid: ovid,
//     std: StdState
//   }
// })

