'use strict'

/*
|--------------------------------------------------------------------------
      { name: 'OvidVaccineSeeder
|--------------------------------------------------------------------------
|
      { name: 'Make use of the Factory instance to seed database with dummy data or
      { name: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class OvidVaccineSeeder {
  async run () {
  	const vaccines = await Database.table('vaccine').insert([
      { name: 'AVA                        ', description: 'description of ..' },
      { name: 'BCG                        ', description: 'description of ..' },
      { name: 'DT                         ', description: 'description of ..' },
      { name: 'DTaP                       ', description: 'description of ..' },
      { name: 'DTaP-HepB-IPV              ', description: 'description of ..' },
      { name: 'DTaP-IPV                   ', description: 'description of ..' },
      { name: 'DTaP-IPV/Hib               ', description: 'description of ..' },
      { name: 'DTaP-P                     ', description: 'description of ..' },
      { name: 'DTaP-P-Hib                 ', description: 'description of ..' },
      { name: 'DTaP/Hib                   ', description: 'description of ..' },
      { name: 'DTaP/Hib:                  ', description: 'description of ..' },
      { name: 'HepA                       ', description: 'description of ..' },
      { name: 'HepA-HepB                  ', description: 'description of ..' },
      { name: 'HepB                       ', description: 'description of ..' },
      { name: 'Hib                        ', description: 'description of ..' },
      { name: 'Hib-HepB                   ', description: 'description of ..' },
      { name: 'HPV2                       ', description: 'description of ..' },
      { name: 'HPV4                       ', description: 'description of ..' },
      { name: 'JE                         ', description: 'description of ..' },
      { name: 'LAIV                       ', description: 'description of ..' },
      { name: 'Lyme Disease Vaccine       ', description: 'description of ..' },
      { name: 'MCV4                       ', description: 'description of ..' },
      { name: 'MEN-C-C                    ', description: 'description of ..' },
      { name: 'MMR                        ', description: 'description of ..' },
      { name: 'MMRV                       ', description: 'description of ..' },
      { name: 'MODC                       ', description: 'description of ..' },
      { name: 'Monkeypox                  ', description: 'description of ..' },
      { name: 'MPSV4                      ', description: 'description of ..' },
      { name: 'PCV13                      ', description: 'description of ..' },
      { name: 'PNEU-C-7                   ', description: 'description of ..' },
      { name: 'Polio                      ', description: 'description of ..' },
      { name: 'PPSV23                     ', description: 'description of ..' },
      { name: 'Rabies                     ', description: 'description of ..' },
      { name: 'RV1                        ', description: 'description of ..' },
      { name: 'RV5                        ', description: 'description of ..' },
      { name: 'Seasonal Influenza only TIV', description: 'description of ..' },
      { name: 'Td                         ', description: 'description of ..' },
      { name: 'Tdap                       ', description: 'description of ..' },
      { name: 'TT                         ', description: 'description of ..' },
      { name: 'Typhoid Oral               ', description: 'description of ..' },
      { name: 'Typhoid Polysaccharide     ', description: 'description of ..' },
      { name: 'VAR                        ', description: 'description of ..' },
      { name: 'VZ                         ', description: 'description of ..' },
      { name: 'YF                         ', description: 'description of ..' },
      { name: 'ZOS                        ', description: 'description of ..' }
  	])

  	console.log('seeded varieties: ' + vaccines)
  }
}

module.exports = OvidVaccineSeeder
