'use strict'

/*
|--------------------------------------------------------------------------
| DiseaseVaccineSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class DiseaseVaccineSeeder {
  async run () {
  
  	const diseases = await Database.table('disease_vaccine').insert([
      { vaccine_id: 44, disease_id: 1},
      { vaccine_id: 24, disease_id: 2},
      { vaccine_id: 25, disease_id: 2},
      { vaccine_id: 7, disease_id: 3},
      { vaccine_id: 9, disease_id: 3},
      { vaccine_id: 10, disease_id: 3},
      { vaccine_id: 11, disease_id: 3},
      { vaccine_id: 15, disease_id: 3},
      { vaccine_id: 16, disease_id: 3},
      { vaccine_id: 24, disease_id: 4},
      { vaccine_id: 25, disease_id: 4},
      { vaccine_id: 27, disease_id: 5},
      { vaccine_id: 19, disease_id: 6},
      { vaccine_id: 4, disease_id: 7},
      { vaccine_id: 5, disease_id: 7},
      { vaccine_id: 6, disease_id: 7},
      { vaccine_id: 7, disease_id: 7},
      { vaccine_id: 8, disease_id: 7},
      { vaccine_id: 9, disease_id: 7},
      { vaccine_id: 10, disease_id: 7},
      { vaccine_id: 11, disease_id: 7},
      { vaccine_id: 33, disease_id: 8},
      { vaccine_id: 24, disease_id: 9},
      { vaccine_id: 25, disease_id: 9},
      { vaccine_id: 36, disease_id: 10},
      { vaccine_id: 29, disease_id: 11},
      { vaccine_id: 21, disease_id: 12},
      { vaccine_id: 22, disease_id: 13},
      { vaccine_id: 2, disease_id: 14},
      { vaccine_id: 34, disease_id: 15},
      { vaccine_id: 35, disease_id: 15},
      { vaccine_id: 40, disease_id: 16},
      { vaccine_id: 41, disease_id: 16},
      { vaccine_id: 1, disease_id: 17},
      { vaccine_id: 39, disease_id: 18},
      { vaccine_id: 12, disease_id: 19},
      { vaccine_id: 13, disease_id: 19},
      { vaccine_id: 42, disease_id: 20},
      { vaccine_id: 45, disease_id: 21},
      { vaccine_id: 17, disease_id: 22},
      { vaccine_id: 18, disease_id: 22},
      { vaccine_id: 3, disease_id: 23},
      { vaccine_id: 4, disease_id: 23},
      { vaccine_id: 5, disease_id: 23},
      { vaccine_id: 6, disease_id: 23},
      { vaccine_id: 7, disease_id: 23},
      { vaccine_id: 8, disease_id: 23},
      { vaccine_id: 9, disease_id: 23},
      { vaccine_id: 10, disease_id: 23},
      { vaccine_id: 11, disease_id: 23},
      { vaccine_id: 31, disease_id: 24},
      { vaccine_id: 5, disease_id: 25},
      { vaccine_id: 13, disease_id: 25},
      { vaccine_id: 14, disease_id: 25},
      { vaccine_id: 16, disease_id: 25}
  	])
  }
}

module.exports = DiseaseVaccineSeeder
