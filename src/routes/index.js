var Router = require('express-promise-router')
var db = require('../../db')
var render = require('../helper/render')
var router = new Router()

var home = require('./home')
var photo = require('./photo')
var gallery = require('./gallery')

router.get('/', render(home))
router.get('/photo', render(photo))
router.get('/gallery', render(gallery))
router.use('/auth', require('./auth'))

module.exports = router