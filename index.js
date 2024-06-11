const express = require('express')
const SyntaxeIO = require('syntaxe-express')
const router = require('./app/module/router')

const app = express()

// Add syntaxe middleware
SyntaxeIO.init({
	enabled: true,
	app
})

// Attach router to app
router.sync(app)

const port = 2000
app.listen(port, () => console.log(`App listening on ${port}`))