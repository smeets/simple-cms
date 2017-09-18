var db = require('../db')
var fs = require('fs')
var path = require('path')
var multer = require('multer')
var Router = require('express-promise-router')
var router = new Router()
var sharp = require('sharp')

var basePath = path.normalize('/usr/share/photo')
if (process.platform === 'win32')
	basePath = path.normalize('D:\\tmp\\photo')

var thumbPath = path.join(basePath, 'thumbnails')
var fullPath = path.join(basePath, 'fullres')
var uploadPath = path.join(basePath, 'upload')
console.log('INFO', 'Photo file paths are', [
	basePath, thumbPath,
	fullPath, uploadPath
])

var storage = multer.diskStorage({
	destination: uploadPath,
	filename: (req, file, cb) => {
		db.query('INSERT INTO photos DEFAULT VALUES RETURNING uuid', function (err, res) {
			if (err) cb(err, '')
			else cb(null, res.rows[0].uuid.toString())
		})
	}
})
var upload = multer({ storage: storage })

function processPipeline(uuid, pipeline, dest) {
	return new Promise(function (F, R) {
		var input = path.join(uploadPath, '/', uuid)
		var output = path.join(dest, '/', uuid)

		var data = fs.createReadStream(input)
		var out = fs.createWriteStream(output)

		data.pipe(pipeline).pipe(out)

		data.on('error', (err) => R('data error: ' + err))
		out.on('error', (err) => R('full error: ' + err))
		out.on('close', F)
	})
}

function processPhoto(uuid) {
	var thumb = sharp().resize(400, 400).max().webp()
	var conv = sharp().webp()

	var thumbnail = processPipeline(uuid, thumb, thumbPath)
	var convert = processPipeline(uuid, conv, fullPath)
	return Promise.all([thumbnail, convert])
}


router.post('/', upload.array('photos'), async (req, res) => {
	try {
		var photos = req.files.map(file => file.filename)
		for (var photo of photos) {
			await processPhoto(photo)
			fs.unlink(path.join(uploadPath, '/', photo), (err) => {})
		}

		res.status(200).json({
			data: photos
		})
	} catch (err) {
		res.status(400).json({
			error: err
		})
	}
})

router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT uuid FROM photos')
		const uuid = rows.map(row => row.uuid)
		res.json({ data: uuid })
	} catch (e) {
		res.status(400).send(e)
	}
})

function pipePhoto(path, res) {
	var stream = fs.createReadStream(path)
	res.setHeader('Content-Type', 'image/webp')
	stream.pipe(res)
}

if (!process.env.NODE_ENV) {
	console.log('INFO', 'Serving photos')
	router.get('/:photo', (req, res) => {
		var uuid = parseInt(req.params.photo).toString()
		pipePhoto(path.join(fullPath, uuid), res)
	})

	router.get('/:photo/thumbnail', (req, res) => {
		var uuid = parseInt(req.params.photo).toString()
		pipePhoto(path.join(thumbPath, uuid), res)
	})
} else {
	console.log('WARN', 'Photos are _not_ served')
}

module.exports = router