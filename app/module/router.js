const express = require('express')
const route = require('./route')
const controller = require('./controller')

const router = express.Router()

router.get(route.root, controller.lifeIsGood)
router.get(route.lifeIsGood, controller.lifeIsGood)
router.get(route.appUsers, controller.getAppUsers)
router.get(route.githubUsers, controller.getGithubUsers)
router.get(route.countries, controller.getCountries)
router.get(route.countriesStates, controller.getCountriesAndStates)
router.get(route.countriesStatesCities, controller.getCountriesStatesAndCities)

module.exports = {
	sync: (app) => app.use(route.root, router) && app.use(route.prefix, router)
}
