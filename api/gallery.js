var db = require('../db')
var Router = require('express-promise-router')

var router = new Router()
module.exports = router

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT DISTINCT ON (name) name FROM gallery')
		const name = rows.map(row => row.name)
		res.json({ data: name })
	} catch (e) {
		res.status(500).send(e)
	}
})

router.get('/:gallery', async (req, res) => {
	const { gallery } = req.params
	const { rows } = await db.query('SELECT uuid FROM gallery WHERE name = $1', [gallery])
	const uuid = rows.map(row => row.uuid)
	res.json({ name: gallery, photos: uuid })
})

async function addPhoto(uuid, gallery) {
	try {
		await db.query('INSERT INTO gallery (uuid,name) VALUES ($1, $2)', [uuid, gallery])
		return true
	} catch (e) {
		return false
	}
}

// POST /gallery/dive-2017 { photos: [uuid] }
router.post('/:gallery', async (req, res) => {
	const { gallery } = req.params
	const { photos } = req.body

	if (!gallery)
		return res.status(400).json({ error: "Invalid gallery" })

	if (!photos)
		return res.status(400).json({ error: "Invalid photos" })

	var added = 0
	for (var photo of photos) {
		var ok = await addPhoto(photo, gallery)
		if (ok) added += 1
	}

	res.json({ data: added })
})

// DELETE /gallery/dive-2017 { photos: [uuid] }
router.delete('/:gallery', async (req, res) => {

})