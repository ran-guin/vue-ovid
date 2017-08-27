<template lang='pug'>
  div.info-header
    div.col-md-6
      Help(:show="demo" demoStep=2 message="User Help...")
      User(role='patient' :user="patient")
    div.col-md-6
      div.navbar-right
        Help(:show="demo" demoStep=1 message="Staff Help...")
        User (role='staff' :user="staff")
</template>

<script>
  import User from '@/components/User'
  import Help from '@/components/Standard/Help'
  
  export default {
    components: {
      User,
      Help
    },
    data () {
      return {
        demo: false
      }
    },
    props: {
      patient: {
        type: Object,
        default () { return {} }
      },
      staff: {
        type: Object,
        default () { return {} }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.info-header {
  height: 100px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
