<template lang='pug'>
  span.demo-btn 
    Help(:show="demo" :demoStep="docs.step" :title='docs.title' :message="docs.message" name='docs.name')
</template>

<script>
  import Help from './../Standard/Help.vue'
  
  export default {
    name: 'schedule',
    data () {
      return {
        documentation: {
          vaccine: {
            name: 'vaccine',
            title: 'Selecting Vaccines',
            step: '5',
            message: 'Select vaccines by:<UL><LI>searching for string in vaccine / disease in existing database</lI><LI>Scanning barcode from applied agent</LI></UL><hr><B>Try typing \'MMR\' to test'
          },
          staff: {
            name: 'staff',
            title: 'Selecting Staff',
            step: '1',
            message: 'Staff may be customized to be set by: <UL><LI>Logging in individually</LI><LI>Scanning employee barcode</LI></UL><hr /><b>Try typing \'Demo\' and clicking on the employee found</b>'
          },
          patient: {
            name: 'patient',
            title: 'Selecting a new Patient',
            step: '2',
            message: 'Users may be loaded by:<ul><LI>Generic search/select (eg enter name OR Birthdate OR Health ID)</LI><LI>Field specific search (eg enter Name & Birthdate in separate fields)</LI><hr><b>Try typing \'James\' and clicking on the applicable employee found</b>'
          },
          disease: {
            name: 'disease',
            title: 'Disease Coverage/Protection',
            step: '3',
            message: '<h2>message for this step</h2>'
          },
          travel: {
            name: 'travel',
            title: 'Selecting a new Patient',
            step: '4',
            message: '<h2>message for this step</h2>'
          },
          history: {
            name: 'history',
            title: 'Patient History',
            step: '6',
            message: '<h2>Patient Immunization History</h2>'
          }
        }
      }
    },
    props: {
      name: {
        type: String
      },
      demo: {
        type: Boolean
      }
    },
    components: {
      Help
    },
    computed: {
      docs: function () {
        if (this.documentation[this.name]) {
          console.log('get documentation for ' + this.name)
          return this.documentation[this.name]
        } else {
          console.log('no documentation for ' + this.name)
          return {}
        }
      }
    }
  }
</script>

<style scoped>
.demo-btn {
  margin: 5px;
  padding: 10px;
}
</style>
