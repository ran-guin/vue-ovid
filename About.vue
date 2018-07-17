<template lang='pug'>
  div
    PrivateHeader.header(:demo="demo")
    div.body.container
      p &nbsp;
      button.btn.btn-default.form-control(@click.prevent="show='overview'") 
        b Overview &nbsp;
        span(v-if="show==='overview'")
          icon(name='angle-up')
        span(v-else)
          icon(name='angle-down')
      div(v-if="show==='overview'")
        p The purpose of OVID is to provide a scalable and flexible vaccination tracking system that is easily adaptable to multiple jurisdictions or immunization programs at minimal cost.
        ul
          li Centralized data repository for tracking immunization events
          li Dependent upon external centralized databases tracking vaccine batches and patient data
          li Powerful API to enable automated access-controlled data retrieval and upload capabilities.  This enables the system to interact with other third party interfaces if required and/or to pass along data to existing centralized data repositories.
          li Focused on usability and value for 3 levels of stakeholder:  users, health professionals, administrators
          li Transparent code and data models to enable flexibility and to prevent technical dependence upon any party.
      p &nbsp;
      button.btn.btn-default.form-control(@click.prevent="show='value'") 
        b Value to Stakeholders &nbsp;
        span(v-if="show==='value'")
          icon(name='angle-up')
        span(v-else)
          icon(name='angle-down')

      div(v-if="show==='value'")
        h5 Patients
        ul
          li Free to use
          li Easy access to vaccination history
          li Control over who can access personal vaccination history
          li Ability to log travel plans to see suggested vaccination requirements based on WHO recommendations
          li Links to information about vaccines / disease / travel recommendations
        h5 Travel Clinics - Public Health Vaccination Staff
        ul
          li Low (or zero) cost software tracking*
          li Easy centralized data entry for tracking patient immunizations
          li Barcode enabled vaccine tracking simplifying data entry and reducing data entry errors
          li Easily visible access to patient vaccination history (if authorized by patients)
          li Real time access to up-to-date information for all diseases and vaccinations
          li Automated notifications for recalls or warnings associated with specific lot numbers
          li May be linked to inventory software to monitor existing vaccine stock levels usage reports
        h5 Health Administration
        ul
          li Low (or zero) cost tracking of public vaccination health data*
          li Easy access to vaccine coverage information
          li Ability to monitor and submit real time notifications or recalls for specific vaccines or lots
          li Reduced inefficiencies in administering vaccines unnecessarily to patients who have lost track of immunization history
        b * - cost model is flexible, but very low, and may be funded at public health level or at clinic level - or shared.
      p &nbsp;
      button.btn.btn-default.form-control(@click.prevent="show='advanced'") 
        b Advanced Options &nbsp;
        span(v-if="show==='advanced'")
          icon(name='angle-up')
        span(v-else)
          icon(name='angle-down')
      div(v-if="show==='advanced'")
        ul
          li User controlled access to personal immunization history.  (While by default applicable health practitioners have access to view patient immunization history, patients may fully restrict access to their data, so even health practitioners will be allowed only to enter new immunization data without viewing patient history)
          li Offline capabilities for use in remote locations, with fundamental vaccine information mirrored locally
          li Additional interface designed for group vaccination programs (eg immunization camps, school groups, community vaccination programs).
            ul
              li Interface designed to enable pre-registration of a cohort of patients in preparation of immunization
              li Barcode wristbands may be given to registered patients to enable separation of patient registration from immunization.  This has the potential to maximize simplicity and efficiency of tracking immunizations.
              li Options for alternative identification systems for use in regions lacking access to standardized health ids.  Adminstrators may define custom fields and/or photo registration for uniquely identifying patients)
      hr
      Modal(id='dbSchema' type='html' :options='DB_options')
      p &nbsp;
    PublicFooter.footer

</template>

<script>

import Modal from './../Standard/Modal'
import PrivateHeader from './PrivateHeader.vue'
import PublicFooter from './PublicFooter.vue'

import 'vue-awesome/icons/angle-down'
import 'vue-awesome/icons/angle-up'

export default {
  name: 'AboutOvid',
  data () {
    return {
      show: 'overview',
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
