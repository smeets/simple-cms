const { Pool } = require('pg')
const config = require('../config').postgres
const pool = new Pool(config)

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}