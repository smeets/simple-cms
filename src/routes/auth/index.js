var Router = require('express-promise-router')
var router = new Router()

router.get('/login', (req, res) => { res.send('Ok') })
router.post('/login', (req, res) => { res.send('Ok') })
router.post('/logout', (req, res) => { res.send('Ok') })

module.exports = router