var Router = require('express').Router

var images = require('./images')
var gallery = require('./gallery')

var router = new Router()

router.use('*', (req, res, next) => {
	if (req.session.login)
		next()
	else
		res.status(403).end()
})

router.use('/photo', images)
router.use('/gallery', gallery)

module.exports = router