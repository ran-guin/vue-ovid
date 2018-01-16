'use strict'

/*
|--------------------------------------------------------------------------
| Ovid Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/
const Logger = use('Logger')
const Route = use('Route')
const Database = use('Database')

Route.get('diseases', async ( {request} ) => {
	Logger.debug('get list of diseases..')
	var search = ''
	if (request.input) {
		search = request.input('search') || ''
	}	

	if (search) {
		search = '%' + search + '%'
	} else { search = '%' }

	Logger.info('search : ' + search)

	return await 
		Database
		.select(
			'disease.name',
			'disease.description',
			'disease.link' 
		)
		.from('disease')
		.where('disease.name', 'like', search)
})

Route.get('vaccines', async ( {request} ) => {
	Logger.debug('get list of vaccines..')
	var search = ''
	if (request.input) {
		search = request.input('search') || ''
	}	

	if (search) {
		search = '%' + search + '%'
	} else { search = '%' }

	Logger.info('search : ' + search)

	return await 
		Database
		.select(
			'vaccine.name',
			'vaccine.code',
			'vaccine.description' 
		)
		.from('vaccine')
		.where('vaccine.name', 'like', search)
		.orWhere('vaccine.code', 'like', search)
})

Route.get('immunizations', async ( {request} ) => {
	Logger.debug('get list of all disease & vaccines..')
	var search = ''
	if (request.input) {
		search = request.input('search') || ''
	}	

	if (search) {
		search = '%' + search + '%'
	} else { search = '%' }

	Logger.info('search : ' + search)

	return await 
		Database
		.select(
			'vaccine.name as vaccine',
			'vaccine.code as code',
			'vaccine.infoLink as vaccineLink',
			'disease.name as disease',
			'disease.link as diseaseLink'
		)
		.from('vaccine')
		.innerJoin('disease_vaccine', 'vaccine_id', 'vaccine.id')
		.innerJoin('disease', 'disease_id', 'disease.id')
		.where('vaccine.name', 'like', search)
		.orWhere('vaccine.code', 'like', search)
		.orWhere('disease.name', 'like', search)
})

