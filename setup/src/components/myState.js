import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

// import StdState from './../Standard/StdState'
// const ovid = {
// use Messaging component to enable real time error messaging ...

export default new Vuex.Store({
  state: {
    user: {},
    count: 1,
    messageContexts: [],
    errors: {},
    errorCount: 0,
    logs: [],
    payload: {},
    loaded: false,
    coverage: []
  },
  getters: {
    getCoverage: state => {
      console.log('GOT COVERAGE')
      return state.coverage
    }
  },
  mutations: {
    resetUser (state) {

    },
    definePayload (state, data) {
      console.log('defined payload')
      state.payload = data
      state.loaded = true

      var url = 'https://vids-siv.phac-aspc.gc.ca/api/vaccine.php'
      axios({url: url, method: 'post'})
        .then(function (result, err) {
          console.log('axios returned value(s): ' + JSON.stringify(result))

          state.coverage = [
            {condition: 'Flu', vaccine: 'H1n1', taken: '2017-01-01', expiry: '2017-09-01', status: 'due'},
            {condition: 'Measles', vaccine: 'MMR', taken: '2017-01-01', expiry: '2019-09-01', status: 'covered'},
            {condition: 'Mumps', vaccine: 'MMR', taken: '2017-01-01', expiry: '2019-09-01', status: 'covered'}
          ]

          console.log('loaded coverage: ' + JSON.stringify(state.coverage))
          if (err) {
            console.log('axios call error')
          } else {
            console.log('done with payload')
          }
        })
    },

    increment: state => state.count++,
    decrement: state => state.count--,

    clearUser (state) {
      console.log('clear ' + state.user.name)
      state.user.id = null
      state.user.name = null
    },

    setError (state, data, clear) {
      var context = data.context || 'default'

      console.log('Error ' + data.context)
      console.log('set Error: ' + data.err)

      if (Object.keys(state.errors).indexOf(context) === -1 || data.clear) {
        state.messageContexts.push(context)
        state.errors[context] = []
      }

      if (data.err) {
        if (data.err.constructor === Error && data.err.message) {
          state.errors[context].push(data.err.message)
        } else if (data.err && data.err.constructor === String) {
          state.errors[context].push(data.err)
        }
      }
      state.errorCount++
      console.log(state.errorCount + ' ERRORS')
    },
    clearErrors (state, context) {
      console.log('clear errors...')
      if (context) {
        state.errors[context] = []
      } else {
        state.errors = {}
      }
      state.errorCount = 0
    },

    log (state, data) {
      console.log('log ' + JSON.stringify(data))
      state.logs.push(data)
    }
  }
})
