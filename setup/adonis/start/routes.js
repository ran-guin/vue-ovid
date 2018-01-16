'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const Helpers = use('Helpers')

require('./t4uRoutes')
require('./OvidRoutes')

Route.on('/').render('welcome')
Route.any('*', ({response}) => response.download(Helpers.publicPath('mainVue.html')))
