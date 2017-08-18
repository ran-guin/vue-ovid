<template lang='pug'>
  div.schedule-section
    Search(:id='vaccineString' title='Schedule Immunizations' scope='vaccine' method='get' url='https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?' searchParameter='product_name' prompt='Search Disease/Vaccines' :multiSelect="true" :addAction="Immunize" modalButton="Save Immunization Record")

</template>

<script>
  import Search from './../Standard/Search.vue'

  export default {
    name: 'schedule',
    data () {
      return {
        msg: 'schedule message',
        vaccineString: '',
        Immunize: { 'Immunize': this.ImmunizePatient }
      }
    },
    props: {
      patient: {
        type: Object,
        default () { return {} }
      }
    },
    components: {
      Search
    },
    methods: {
      ImmunizePatient: function (data) {
        console.log('Immunize Me With ')
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
