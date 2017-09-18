var Router = require('express-promise-router')
var db = require('../../db')
var router = new Router()

var home = require('./home')
router.get('/', (req, res) => {
	res.marko(home, {
		session: req.session
	})
})

var photo = require('./photo')
router.get('/photo', (req, res) => {
	res.marko(photo, {
		session: req.session
	})
})

var gallery = require('./gallery')
router.get('/gallery', async (req, res) => {

	res.marko(gallery, {
		session: req.session
	})
})

module.exports = router