var Router = require('express-promise-router')
var router = new Router()
var render = require('../../helper/render')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded())

function authenticate(user, pass, req) {
	if (user === pass) {
		req.session.login = true
		req.session.user = user
		return true
	}
	return false
}

var login = require('./login')
router.get('/login', render(login))

router.post('/login', (req, res) => {
	const {user, pass} = req.body

	if (authenticate(user, pass, req))
		res.redirect('/')
	else
		res.marko(login, {
			session: req.session,
			notices: ['Invalid login!']
		})
})

router.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})

module.exports = router