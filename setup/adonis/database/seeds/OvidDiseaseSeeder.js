'use strict'

/*
|--------------------------------------------------------------------------
      { name: 'OvidDiseaseSeeder
|--------------------------------------------------------------------------
|
      { name: 'Make use of the Factory instance to seed database with dummy data or
      { name: 'make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class OvidDiseaseSeeder {
  async run () {
  	const diseases = await Database.table('disease').insert([
      { name: 'YELLOW FEVER         ', link: 'http://www.cdc.gov//vaccines/vpd-vac/yf/default.htm#vacc        '},
      { name: 'RUBELLA              ', link: 'http://www.cdc.gov//vaccines/vpd-vac/rubella/default.htm#vacc   '},
      { name: 'HIB                  ', link: 'http://www.cdc.gov//vaccines/vpd-vac/hib/default.htm#vacc       '},
      { name: 'MUMPS                ', link: 'http://www.cdc.gov//vaccines/vpd-vac/mumps/default.htm#vacc     '},
      { name: 'SMALLPOX             ', link: 'http://www.cdc.gov//vaccines/vpd-vac/smallpox/default.htm#vacc  '},
      { name: 'JAPANESE ENCEPHALITIS', link: 'http://www.cdc.gov//vaccines/vpd-vac/j-enceph/default.htm#vacc  '},
      { name: 'PERTUSSIS            ', link: 'http://www.cdc.gov//vaccines/vpd-vac/pertussis/default.htm#vacc '},
      { name: 'RABIES               ', link: 'http://www.cdc.gov//vaccines/vpd-vac/rabies/default.htm#vacc    '},
      { name: 'MEASLES              ', link: 'http://www.cdc.gov//vaccines/vpd-vac/measles/default.htm#vacc   '},
      { name: 'INFLUENZA            ', link: 'http://www.cdc.gov//vaccines/vpd-vac/flu/default.htm#vacc       '},
      { name: 'PNEUMOCOCCAL         ', link: 'http://www.cdc.gov//vaccines/vpd-vac/pneumo/default.htm#vacc    '},
      { name: 'LYME DISEASE         ', link: 'http://www.cdc.gov//vaccines/vpd-vac/lyme/default.htm#vacc      '},
      { name: 'MENINGOCOCCAL        ', link: 'http://www.cdc.gov//vaccines/vpd-vac/mening/default.htm#vacc    '},
      { name: 'TUBERCULOSIS         ', link: 'http://www.cdc.gov//vaccines/vpd-vac/tb/default.htm#vacc        '},
      { name: 'ROTAVIRUS            ', link: 'http://www.cdc.gov//vaccines/vpd-vac/rotavirus/default.htm#vacc '},
      { name: 'TYPHOID              ', link: 'http://www.cdc.gov//vaccines/vpd-vac/typhoid/default.htm#vacc   '},
      { name: 'ANTHRAX              ', link: 'http://www.cdc.gov//vaccines/vpd-vac/anthrax/default.htm#vacc   '},
      { name: 'TETANUS              ', link: 'http://www.cdc.gov//vaccines/vpd-vac/tetanus/default.htm#vacc   '},
      { name: 'HEPATITIS A          ', link: 'http://www.cdc.gov//vaccines/vpd-vac/hepa/default.htm#vacc      '},
      { name: 'CHICKENPOX           ', link: 'http://www.cdc.gov//vaccines/vpd-vac/varicella/default.htm#vacc '},
      { name: 'SHINGLES             ', link: 'http://www.cdc.gov//vaccines/vpd-vac/shingles/default.htm#vacc  '},
      { name: 'HPV                  ', link: 'http://www.cdc.gov//vaccines/vpd-vac/hpv/default.htm#vacc       '},
      { name: 'DIPHTHERIA           ', link: 'http://www.cdc.gov//vaccines/vpd-vac/diphtheria/default.htm#vacc'},
      { name: 'POLIO                ', link: 'http://www.cdc.gov//vaccines/vpd-vac/polio/default.htm#vacc     '},
      { name: 'HEPATITIS B          ', link: 'http://www.cdc.gov//vaccines/vpd-vac/hepb/default.htm#vacc      '}
  	])

  	console.log('seeded varieties: ' + diseases)
  }
}

module.exports = OvidDiseaseSeeder
