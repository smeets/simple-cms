var express = require('express')

var app = express()
var config = require('./config')

var express = require('express')
var app = express()

var session = require('express-session')
var RedisStore = require('connect-redis')(session)
app.use(session({
    store: new RedisStore(config.redis),
    secret: config.session.secret
}))

if (process.env.MODE !== 'prod') {
	console.log('Hosting local content')
	app.use('/', express.static('./public'))
}

var initContentModules = require('./content')
initContentModules(app)

var port = process.env.PORT || 8080
app.listen(port, () => console.log('Serving on ' + port))