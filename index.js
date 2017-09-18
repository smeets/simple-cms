require('marko/express')
require('marko/node-require')

var express = require('express')

var config = require('./config')
var port = process.env.PORT || 8080
var isDev = !process.env.NODE_ENV

require('lasso').configure({
	plugins: [
		'lasso-marko'
	],
	outputDir: __dirname + '/static',
	bundlingEnabled: !isDev,
	minify: !isDev,
	fingerprintsEnabled: !isDev
})

var app = express()

var session = require('express-session')
var RedisStore = require('connect-redis')(session)
app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session.secret
}))

if (isDev) {
	console.log('INFO', 'Serving files from static/')
	app.use(require('lasso/middleware').serveStatic())
} else {
	console.log('WARN', 'Static files are not served')
}

app.use('/', require('./src/routes'))
app.use('/api', require('./api'))

app.listen(port, (err) => {
	if (err) throw err

	console.log('Listening on port %d', port)
})