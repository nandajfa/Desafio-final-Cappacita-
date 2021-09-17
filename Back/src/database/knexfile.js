// Update with your config settings.

module.exports = {
  client: 'mysql2',
  connection: {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'filmes_series'
  },
  debug: true
};
