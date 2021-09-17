const knex = require('knex')
const databaseConfig = require('./knexfile')

const databaseConnection = knex(databaseConfig)

module.exports = { databaseConnection }
