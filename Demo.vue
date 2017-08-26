<template lang='pug'>
  span 
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
            step: '3',
            message: 'Select string to search for vaccines in existing database<hr><B>Try typing \'MMR\' to test'
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
        }
      }
    }
  }
</script>

<style scoped>

</style>
