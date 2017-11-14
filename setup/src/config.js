export default {
  links: ['Visit', 'User', 'Stats'],

  vaccineURL: 'https://vaccineURL',
  userURL: 'http://localhost:1234/Record_API/search?table=user',
  dbURL: 'http://localhost:1234/Record_API/fields',
  apiUrl: 'https://test-api.herokuapp.com',
  vaccineSearchURL: 'https://vids-siv.phac-aspc.gc.ca/api/vaccine.php?',
  diseaseURL: 'http://localhost:1234/Record_API/search?table=disease',
  travelURL: 'http://localhost:1234/Record_API/search?table=country',
  countryURL: 'https://restcountries.eu/rest/v2/name/<region>?fields=name;region;subregion',

  demo_payload: {patient: {id: 1, name: 'Ran'}, staff: {id: 3, name: 'Admin'}, access: 'admin'}
}
