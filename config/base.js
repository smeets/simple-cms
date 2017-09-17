var redis = {
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || 6379,
	pass: process.env.REDIS_PASS || ''
}

var session = {
	secret: process.env.SESSION_KEY || 'work-work'
}

var postgres = {
	user: process.env.POSTGRES_USER || 'postgres',
	password: process.env.POSTGRES_PASSWORD || 'T__T',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: process.env.POSTGRES_PORT || 5432,
	database: process.env.POSTGRES_DB || 'default'
}

module.exports = {
	session: session,
	redis: redis,
	postgres: postgres
}