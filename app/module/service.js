const { appUsers, githubUsers, countries, countriesStates, countriesStatesCities } = require('../../data')
const { Ok, Rebuke } = require('../utils/response')

class AppService {
	constructor(){}

	// Get app users data
	async getAppUsersData() {
		try {
			const data = await Promise.resolve(appUsers)

			return new Ok(data)
		} catch (err) {
			return new Rebuke('An error occurred!')
		}
	}

	// Get github users data
	async getGithubUsersData() {
		try {
			const data = await Promise.resolve(githubUsers)
			
			return new Ok(data) 
		} catch (err) {
			return new Rebuke(JSON.stringify(err))
		}
	}

	// Get countries data
	async getCountriesData() {
		try {
			const data = await Promise.resolve(countries)

			return new Ok({
				code: 200,
				message: 'Countries data successfully returned.',
				data
			})
		} catch (err) {
			return new Rebuke('Conflict!', 409)
		}
	}

	// Get countries and states data
	async getCountriesAndStatesData() {
		try {
			const data = await Promise.resolve(countriesStates)

			return new Ok(data)
		} catch (err) {
			return new Rebuke('Server Error', 500)
		}
	}

	// Get countries, states and cities data
	async getCountriesStatesAndCitiesData() {
		try {
			const data = await Promise.resolve(countriesStatesCities)

			return new Ok(data)
		} catch (err) {
			return new Rebuke()
		}
	}

	// LG service
	async lifeIsGood() {
		try {
			const data = await Promise.resolve('Life is good!')

			return new Ok(data)
		} catch (err) {
			return new Rebuke()
		}
	}
}

module.exports = new AppService()