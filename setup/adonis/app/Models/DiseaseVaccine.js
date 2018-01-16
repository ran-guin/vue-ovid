'use strict'

const Model = use('Model')

class DiseaseVaccine extends Model {
  static get table () {
    return 'disease_vaccine'
  }
}

module.exports = DiseaseVaccine
