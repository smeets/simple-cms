module.exports = function (template) {
	return function (req, res) {
		var session = req.session || {}
		res.marko(template, {
			session: {
				login: session.login,
				user: session.user
			}
		})
	}
}