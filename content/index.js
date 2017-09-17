var images = require('./images')
var gallery = require('./gallery')

module.exports = function (app) {
	app.use('/photo', images)
	app.use('/gallery', gallery)
}