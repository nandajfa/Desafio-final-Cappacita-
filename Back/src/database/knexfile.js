// Update with your config settings.

module.exports = {
  client: 'mysql2',
  connection: {
    host : process.env.HOST,
    port : process.env.PORT,
    user : process.env.USER,
    password : process.env.PASS,
    database : 'filmes_series'
  },
  debug: true
};
