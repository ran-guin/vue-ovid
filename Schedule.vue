<template lang='pug'>
  span.schedule-section
    Demo(:demo="demo" name='vaccine')
    Search(:id='vaccineString' model='vaccine' title='Schedule Immunizations' scope='vaccine' method='get' url='https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?' searchParameter='product_name' prompt='Search Disease/Vaccines' :multiSelect="true" :addLinks="addLinks" :addAction="Immunize" :targets="scheduled")

</template>

<script>
  import Search from './../Standard/Search.vue'
  import Demo from './Demo.vue'
  import config from '@/config.js'
  
  export default {
    name: 'schedule',
    data () {
      return {
        msg: 'schedule message',
        vaccineString: '',
        Immunize: { 'Immunize': this.ImmunizePatient },
        userURL: config.userURL,
        addLinks: [
          {type: 'button', name: 'Immunize Me', modal: {function: this.ImmunizePatient, table: 'immunize', button: 'Save Immunization Rec', close: 'Cancel'}},
          {type: 'button', name: 'more info', function: this.MoreInfo}
        ]
      }
    },
    props: {
      patient: {
        type: Object,
        default () { return {} }
      },
      demo: {
        type: Boolean
      },
      scheduled: {
        type: Array
      }
    },
    components: {
      Search,
      Demo
    },
    methods: {
      ImmunizePatient: function (data) {
        console.log('Immunize Me With ')
        console.log(JSON.stringify(data))
      },
      MoreInfo: function (data) {
        console.log('get more info')
        console.log(JSON.stringify(data))
      }
    }
  }
</script>

<style scoped>
  .schedule {
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 40px;
    border: 1px solid black;
    padding: 10px;
  }  
</style>
