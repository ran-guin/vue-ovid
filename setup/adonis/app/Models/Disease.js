'use strict'

const Model = use('Model')

class Disease extends Model {
  static get table () {
    return 'disease'
  }

  vaccines () {
  return this
    .belongsToMany('App/Models/Disease')
    .pivotTable('disease_vaccine')
  }
}

module.exports = Disease
