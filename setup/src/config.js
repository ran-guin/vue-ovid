export default {
  links: ['Visit', 'User', 'Stats', 'T4U'],

  vaccineURL: 'https://vaccineURL',
  userURL: 'http://localhost:1234/Record_API/search?table=user',
  dbURL: 'http://localhost:1234/Record_API/fields',
  apiUrl: 'https://test-api.herokuapp.com',
  vaccineSearchURL: 'https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?',
  vaccineMirrorURL: 'http://localhost:1234/Record_API/search?table=vaccine',
  diseaseURL: 'http://localhost:1234/Record_API/search?table=disease',
  diseaseMirrorURL: 'http://localhost:1234/Record_API/search?table=disease',
  coverageMirrorURL: 'http://localhost:1234/Record_API/search?table=coverage',
  travelURL: 'http://localhost:1234/Record_API/search?table=country',
  countryURL: 'https://restcountries.eu/rest/v2/name/<region>?fields=name;region;subregion',

  demo_payload: {patient: {id: 1, name: 'Ran', birthdate: '1970-11-27'}, staff: {id: 3, name: 'Admin'}, access: 'admin'},
  demo_coverage: [
      {id: '2', coverage: 'Flu [H1N1]', vaccine: 'H1n1', taken: '2017-01-01', expiry: '2017-09-01', status: 'due'},
      {id: '3', coverage: 'Measles, Mumps, Rubella', vaccine: 'MMR', taken: '2017-01-01', expiry: '2019-09-01', status: 'covered'}
  ],
  demo_history: [
    {id: '2', vaccine: 'Tetanus', coverage: 'Tetanus', applied: '2012-09-01', reactionLevel: 'Mild', notes: 'itchy'}
  ],
  demo_travel: [{country: 'Japan', region: 'Asia', subregion: 'Eastern Asia'}]
}
