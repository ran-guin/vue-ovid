<template lang='pug'>
  div
    PrivateHeader.header(:demo="demo")
    div.body.container
      h3 Overview
      p The purpose of OVID is to provide a scalable and flexible vaccination tracking system that is easily adaptable to multiple jurisdictions or immunization programs at minimal cost.
      ul
        li Centralized data repository for tracking immunization events
        li Dependent upon external centralized databases tracking vaccine batches and patient data
        li Powerful API to enable automated access-controlled data retrieval and upload capabilities.  This enables the system to interact with other third party interfaces if required and/or to pass along data to existing centralized data repositories.
        li Focused on usability and value for 3 levels of stakeholder:  users, health professionals, administrators
        li Transparent code and data models to enable flexibility and to prevent technical dependence upon any party.
      h4 Advanced Options
      ul
        li User controlled access to personal immunization history.  (While by default applicable health practitioners have access to view patient immunization history, patients may fully restrict access to their data, so even health practitioners will be allowed only to enter new immunization data without viewing patient history)
        li Offline capabilities for use in remote locations, with fundamental vaccine information mirrored locally
        li Additional interface designed for group vaccination programs (eg immunization camps, school groups, community vaccination programs).
          ul
            li Interface designed to enable pre-registration of a cohort of patients in preparation of immunization
            li Barcode wristbands may be given to registered patients to enable separation of patient registration from immunization.  This has the potential to maximize simplicity and efficiency of tracking immunizations.
            li Options for alternative identification systems for use in regions lacking access to standardized health ids.  Adminstrators may define custom fields and/or photo registration for uniquely identifying patients)
      hr
      Modal(id='dbSchema' :options='DB_options')
      p &nbsp;
    PublicFooter.footer

</template>

<script>

import Modal from './../Standard/Modal'
import PrivateHeader from './PrivateHeader.vue'
import PublicFooter from './PublicFooter.vue'

export default {
  name: 'AboutOvid',
  data () {
    return {
      DB_options: {
        title: 'Scope of Databases used by OVID',
        openButton: 'Database Overview',
        htmlContent: "<img src='/static/images/ovid_db.png' style='width:100%'/>'"
      },
      OVID_options: {
        title: 'Data maintained within OVID',
        openButton: 'OVID Data Schema',
        htmlContent: "<img src='/static/images/ovid_schema.png' style='width:100%'/>'"
      }
    }
  },
  components: {
    Modal,
    PrivateHeader,
    PublicFooter
  },

  methods: {
  }
}
</script>

<style scoped>
</style>
