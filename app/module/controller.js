const service = require('./service')

class AppController {
	constructor(){}

	// Get app users
	async getAppUsers(req, res) {
		try {
			const result = await service.getAppUsersData()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.json(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// Get github users
	async getGithubUsers(req, res) {
		try {
			const result = await service.getGithubUsersData()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.json(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// Get coutries
	async getCountries(req, res) {
		try {
			const result = await service.getCountriesData()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.json(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// Get coutries and states
	async getCountriesAndStates(req, res) {
		try {
			const result = await service.getCountriesAndStatesData()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.json(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// Get coutries, states and cities
	async getCountriesStatesAndCities(req, res) {
		try {
			const result = await service.getCountriesStatesAndCitiesData()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.json(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// App information
	async appInformation(req, res) {
		try {
			const result = await service.getAppInformation()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.send(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}

	// LG action
	async lifeIsGood(req, res) {
		try {
			const result = await service.lifeIsGood()

			// Check for error
			if (result.error)
				return res.status(result.code).send(result.message)

			res.send(result)
		} catch (err) {
			res.sendStatus(500)
		}
	}
}

module.exports = new AppController()