'use strict'
// const Database = use('Database')
const Disease = use('App/Models/Disease')
const Database = use('Database')
const TeaType = use('App/Models/TeaType')

const { validate } = use('Validator')

class DiseaseController {

	async list ({ request, response, session }) {
		console.log("get list of diseases..")
		// var search = ''
		// if (request.input) {
		// 	search = request.input('search') || ''
		// }

		// search = search + '%'

		var list = yield TeaType.all()
		console.log(JSON.stringify(list))

		return list
	}
}

module.exports = DiseaseController
