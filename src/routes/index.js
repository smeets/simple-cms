var Router = require('express-promise-router')
var db = require('../../db')
var router = new Router()

var home = require('./home')
var photo = require('./photo')
var gallery = require('./gallery')

function render(template) {
	return (req, res) => {
		res.marko(template, {
			session: req.session
		})
	}
}

router.use('/auth', require('./auth'))

router.get('/', render(home))
router.get('/photo', render(photo))
router.get('/gallery', render(gallery))

module.exports = router