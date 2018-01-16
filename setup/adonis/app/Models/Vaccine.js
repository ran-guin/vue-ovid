'use strict'

const Model = use('Model')

class Vaccine extends Model {
  static get table () {
    return 'vaccine'
  }

}

module.exports = Vaccine
