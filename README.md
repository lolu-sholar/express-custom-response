# Custom Response Object

This simple express.js application showcases the use of a custom base response object to seamlessly generate and return success or error responses.

This can prove very useful when building an application that separates logic into controller and service files.



### Description

There are three response classes defined in the `utils/response.js` file:

- `BaseResponse` - The base response class

- `Ok` - A response class for generating success responses (inherits `BaseResponse`)

- `Rebuke` - A response class for generating error responses (inherits `BaseResponse`)



### Preview

```js
const status = true
if (status) {
    return new Ok({
        code: 200,
        message: "Operation was successful.",
        data: {
            id: 1,
            name: "John Wick"
        }
    })
} else {
    return new Rebuke()
}
```



### Example

#### Startup

Create the express application and connect the router to it.

```js
const express = require('express')
const router = require('./app/module/router')

const app = express()

// Attach router to app
router.sync(app)

const port = 2000
app.listen(port, () => console.log(`App listening on ${port}`))
```

#### Router

```js
const express = require('express')
const route = require('./route')
const controller = require('./controller')

const router = express.Router()

router.get(route.appUsers, controller.getAppUsers)

module.exports = {
	sync: (app) => app.use(route.prefix, router)
}
```

#### Routes

```js
module.exports = {
	prefix: '/api',
	appUsers: '/app-users'
}
```

#### Controller

```js
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
}

module.exports = new AppController()
```

#### Service

In the service class, we import the `Ok` and `Rebuke` response classes from our `utils/response.js` definition file.

When we need to generate a success response, we return a new `Ok` response class instance.

When we need to generate an error response, we return a new `Rebuke` response class instance.

```js
const { appUsers } = require('../../data')
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
}

module.exports = new AppService()
```

#### Custom Response Classes

```js
// Base response
class BaseResponse {
	ok = 200
	bad = 400
	code
	message
	error
	data

	constructor(options) {
		this.code = options?.code || (options?.error ? this.bad : this.ok)
		this.message = options?.message || options?.error || 'Success'
		this.error = Boolean(options?.error)
		this.data = options?.data

		// If there's no error, omit the error field
		if (!this.error)
			delete this.error

		// Omit the ok and bad fields
		delete this.ok
		delete this.bad
	}
}

// Error response
class Rebuke extends BaseResponse {
	constructor(error = 'error', code) {
		super({ error, code })
	}
}

// Success response
class Ok extends BaseResponse {
	constructor(options) {
		let config

		if (!['string', 'undefined'].includes(typeof options)) {
			if (Array.isArray(options))
				config = { data: options }
			else if (options.hasOwnProperty('data') || options.hasOwnProperty('message') || options.hasOwnProperty('code')) {
				config = { ...options }
			} else config = { data: options } 
		} else config = { message: options }

		super(config)
	}
}

module.exports = { Ok, Rebuke }
```

#### Examples of an `Ok` response

The `Ok` response class always returns three fields:

- `code` - This field contains the success code. Default is `200`.

- `message` - This field contains the success message. Default is `Success`.

- `data` - This field contains the data to be returned.

```js
// Default success response
new Ok()

// Pass a success response message
new Ok("This is a simple success response")

// Pass just the success response data
new Ok([])

// Pass the all three fields: code, message and data as an object argument
new Ok({
    code: 201,
    message: "User created.",
    data: {
        name: "John Wick"
    }
})
```

#### Examples of a `Rebuke` response

The `Rebuke` response class always returns three fields:

- `code` - This field contains the error code. Default is `400`.

- `message` - This field contains the error message. Default is `Error`.

- `error` - This field holds a boolean value which is always `true`.

```js
// Default error response
new Rebuke()

// Pass an error response message
new Rebuke("An error occurred.")

// Pass an error  response message and code
new Rebuke("Unauthorized access!", 401)
```