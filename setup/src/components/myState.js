import Vue from 'vue'
import Vuex from 'vuex'

// import axios from 'axios'
// import config from '@/config.js'

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
    warnings: {},
    warningCount: 0,
    messages: {},
    messageCount: 0,
    logs: [],
    coverage: [],
    payload: {},
    loaded: false,
    // scheduled: [],
    hash: {},
    hash_fields: {},
    hash_map: {},
    hash_defaults: {},
    updates: 1,
    status: 'init',
    links: {},
    activeModal: '',
    waitingModal: '',
    modalContent: '',
    modalData: [],
    activeBlock: 'a'
  },
  getters: {
    defaultBlock: state => id => {
      console.log('set default ' + id)
      state.activeBlock = id
    },
    toggleBlock: state => id => {
      console.log('state toggle block: ' + id)
      var el = document.getElementById(id)

      if (el) {
        if (state.activeBlock === id) {
          el.classList.toggle('b-fadeIn')
          el.classList.toggle('b-fadeOut')

          console.log('clear block' + id)
          state.activeBlock = ''
        } else if (state.activeBlock) {
          var el2 = document.getElementById(state.activeBlock)
          if (el2) {
            el2.classList.toggle('b-fadeIn')
            el2.classList.toggle('b-fadeOut')
          }
          setTimeout(() => {
            el.classList.toggle('b-fadeIn')
            el.classList.toggle('b-fadeOut')
            state.activeBlock = id
          }, 1000)
        } else {
          console.log('set ' + el)
          el.classList.toggle('b-fadeIn')
          el.classList.toggle('b-fadeOut')
          state.activeBlock = id
        }
      }
    },
    showBlock: state => id => {
      console.log('state toggle block: ' + id)
      var el = document.getElementById(id)

      if (el) {
        if (state.activeBlock === id) {
          // el.classList.toggle('b-fadeIn')
          // el.classList.toggle('b-fadeOut')

          console.log('clear block' + id)
          state.activeBlock = ''
        } else {
          console.log('set ' + el)
          el.classList.toggle('b-fadeIn')
          el.classList.toggle('b-fadeOut')
          state.activeBlock = id
        }
      }
    },
    toggleModal: state => id => {
      console.log('state toggle modal: ' + id)
      var el = document.getElementById(id)
      if (el) {
        console.log('found')
        el.classList.toggle('m-fadeIn')
        el.classList.toggle('m-fadeOut')
        console.log('active: ' + state.activeModal)

        if (state.activeModal && state.activeModal !== id) {
          var el2 = document.getElementById(state.activeModal)
          if (el2) {
            console.log('toggle alt ' + state.activeModal)
            el2.classList.toggle('m-fadeIn')
            el2.classList.toggle('m-fadeOut')
            state.waitingModal = state.activeModal
          }
          state.activeModal = id
        } else if (state.activeModal === id) {
          console.log('toggle id: ' + state.activeModal)
          if (state.waitingModal) {
            console.log('reopen ' + state.waitingModal)
            var el3 = document.getElementById(state.waitingModal)
            state.activeModal = state.waitingModal
            state.waitingModal = ''
            el3.classList.toggle('m-fadeIn')
            el3.classList.toggle('m-fadeOut')
          } else {
            console.log('toggle: ' + state.activeModal)
            state.activeModal = ''
          }
        } else {
          state.activeModal = id
        }
      } else { console.log('no element ' + id) }
    },
    payload: state => {
      return state.payload
    },
    modalData: state => {
      console.log('retrieve ' + state.modalData)
      return state.modalData
    },
    modalContent: state => {
      return state.modalContent
    },
    updates: state => {
      console.log('reload updates')
      return state.updates
    },
    getStatus: state => {
      console.log('got state: ' + state.status)
      return state.status
    },
    getActiveBlock: state => {
      return state.activeBlock
    },
    getLinks: state => {
      console.log('retrieve links')
      return state.links
    },
    getHash: state => key => {
      // var key = 'coverage'
      console.log(' Get Data: ' + key)
      // console.log(JSON.stringify(state.hash)) // this log message triggers update (required !)
      // console.log(JSON.stringify(state.coverage)) // this log message triggers update (required !)
      // console.log(JSON.stringify(state.scheduled)) // this log message triggers update (required !)
      // console.log(JSON.stringify(state.hash.scheduled)) // this log message triggers update (required !)
      console.log(JSON.stringify(state.updates)) // this log message triggers update (required !)
      if (key) {
        return state.hash[key]
      } else { return state.updates }
    }
  },
  watch: {
    'coverage': function () {
      console.log('ok')
    }
  },
  mutations: {
    resetUser (state) {

    },
    appendModal (state, fields) {
      console.log('add ' + JSON.stringify(fields))
      for (var i = 0; i < fields.length; i++) {
        var l = state.modalData.length
        Vue.set(state.modalData, l, fields[i])
      }
    },
    loadInfoModal (state, data, append) {
      console.log('load info modal with Data: ' + JSON.stringify(data))

      if (!append) {
        console.log('clear previous data...')
        state.modalData = []
      }

      if (data.constructor === Array) {
        for (var i = 0; i < data.length; i++) {
          var l = state.modalData.length
          Vue.set(state.modalData, l, data[i])
        }
      } else {
        var m = state.modalData.length
        Vue.set(state.modalData, m, data)
      }
      console.log(JSON.stringify(data))
      console.log(JSON.stringify(state.modalData))
    },
    defineLinks (state, data) {
      state.links = data
    },
    defineHash (state, options) {
      // define custom hash - typically called from created section of primary component
      console.log('define hash as: ' + JSON.stringify(options))

      if (!options) { options = {} }
      var key = options.key
      var fields = options.fields
      var defaults = options.defaults
      var map = options.map

      if (key && fields && fields.length) {
        state.hash_fields[key] = fields
        // for (var i = 0; i < fields.length; i++) {
        //   Vue.set(state.hash_fields[key], i, fields[i])
        //   console.log('set ' + i + ' to ' + fields[i])
        // }
        if (defaults) {
          state.hash_defaults[key] = defaults
        }

        if (map) {
          state.hash_map[key] = map
        }
      } else {
        console.log('hash defined without key or fields ?')
      }
    },
    setHash (state, options) {
      var key = options.key
      var data = options.value

      state.hash[key] = data
      console.log('set ' + key + ' to ' + JSON.stringify(data))
    },
    pushHash (state, data) {
      var key = data.key
      var record = data.record

      if (key && record) {
        if (!state.hash[key]) { state.hash[key] = [] }

        console.log(' add record to ' + key)
        console.log('+ ' + JSON.stringify(record))

        var length = state.hash[key].length

        Vue.set(state.hash[key], length, record)
        console.log(JSON.stringify(state.hash[key]))
        state.updates = state.updates + 1
      } else {
        console.log('incorrect input data (require key and record')
        return null
      }
    },
    squeezeHash (state, data) {
      // similar to setHash, but only includes keys based on pre-defined fields for this hash element
      console.log('squeeze')
      console.log(JSON.stringify(data))
      var key = data.key
      var record = data.record

      if (key && record) {
        console.log('adding ' + key)
        var fields = state.hash_fields[key] || Object.keys(record)
        var defaults = state.hash_defaults[key] || {}

        console.log('f: ' + fields)
        if (fields) {
          var map = state.hash_map[key]
          if (!state.hash[key]) { state.hash[key] = [] }

          var newRecord = {}
          var info = 0
          console.log('add fields: ' + fields.join(','))
          for (var i = 0; i < fields.length; i++) {
            var field = fields[i]

            if (record[field]) {
              newRecord[field] = record[field]
              info++
            } else if (map && map[field] && record[map[field]]) {
              console.log('mapped ' + field + ' to ' + map[field])
              newRecord[field] = record[map[field]]
              info++
            } else if (defaults && defaults[field]) {
              newRecord[field] = defaults[field]
            }
          }
          console.log('info...')
          if (info) {
            console.log(' add record to ' + key)
            console.log('+ ' + JSON.stringify(newRecord))

            var array = state.hash[key]
            array.push(newRecord)
            Vue.set(state.hash, key, array)

            state.updates++
            // var length = state.hash[key].length
            // Vue.set(state.hash[key], length, newRecord)

            // state.hash[key].push(newRecord)
            console.log(JSON.stringify(state.hash[key]))
          } else {
            console.log('no data to add')
          }
        } else {
          console.log('field list not supplied... ')
        }
      } else {
        console.log('incorrect input data (require key and record and defined hash_fields)')
        return null
      }
    },

    increment: state => state.count++,
    decrement: state => state.count--,

    clearUser (state) {
      console.log('clear ' + state.user.name)
      state.user.id = null
      state.user.name = null
    },

    logMessage (state, data, clear) {
      var context = data.context || 'default'

      console.log('Error ' + data.context)
      console.log('set Error: ' + data.err)

      if (Object.keys(state.errors).indexOf(context) === -1 || data.clear) {
        state.messageContexts.push(context)
        state.errors[context] = []
        state.warnings[context] = []
        state.messages[context] = []
      }

      if (data.err) {
        if (data.err.constructor === Error && data.err.message) {
          state.errors[context].push(data.err.message)
        } else if (data.err && data.err.constructor === String) {
          state.errors[context].push(data.err)
        } else {
          console.log('unrecognized data.err type ?: ' + data.err.constructor)
        }
        state.errorCount++
      } else if (data.warning) {
        state.warnings[context].push(data.warning)
        state.warningCount++
      } else if (data.message) {
        state.messages[context].push(data.message)
        state.messageCount++
      }

      console.log(state.errorCount + ' ERRORS')
      console.log(JSON.stringify(state.errors))
      console.log(state.warningCount + ' Warnings')
      console.log(JSON.stringify(state.warnings))
      console.log(state.messageCount + ' Messages')
      console.log(JSON.stringify(state.messages))
    },
    setError (state, data, clear) {
      // replace with logMessage...
      var context = data.context || 'std'

      console.log('Error ' + data.context)
      console.log('set Error: ' + data.err)

      if (Object.keys(state.errors).indexOf(context) === -1 || data.clear) {
        state.messageContexts.push(context)
        state.errors[context] = []
        state.warnings[context] = []
        state.messages[context] = []
      }

      if (data.err) {
        if (data.err.constructor === Error && data.err.message) {
          state.errors[context].push(data.err.message)
        } else if (data.err && data.err.constructor === String) {
          state.errors[context].push(data.err)
        } else {
          console.log('unrecognized data.err type ?: ' + data.err.constructor)
        }
        state.errorCount++
      } else if (data.warning) {
        state.warnings[context].push(data.warning)
        state.warningCount++
      } else if (data.message) {
        state.messages[context].push(data.warning)
        state.messageCount++
      }

      console.log(state.errorCount + ' ERRORS')
      console.log(state.warningCount + ' Warnings')
      console.log(state.messageCount + ' Messages')
    },

    clearErrors (state, context) {
      console.log('clear errors...')
      if (context) {
        state.errors[context] = []
        state.warnings[context] = []
        state.messages[context] = []
      } else {
        state.errors = {}
        state.warnings = {}
        state.messages = {}
      }
      state.errorCount = 0
      state.warningCount = 0
      state.messageCount = 0
    },

    hideActive (state) {
      console.log('hide active')
      if (state.activeBlock) {
        var el = document.getElementById(state.activeBlock)
        el.classList.toggle('b-fadeIn')
        el.classList.toggle('b-fadeOut')
        state.activeBlock = ''
        console.log('cleared')
      }
    },
    log (state, data) {
      console.log('log ' + JSON.stringify(data))
      state.logs.push(data)
    }
  },
  actions: {
    setModalData (state, data) {
      console.log('load info modal with data: ' + JSON.stringify(data))
      var append = false
      state.commit('loadInfoModal', data, append)
    },
    hideActiveBlock (context) {
      return new Promise((resolve, reject) => {
        context.commit('hideActive')
        resolve()
      })
    }
  }
})
