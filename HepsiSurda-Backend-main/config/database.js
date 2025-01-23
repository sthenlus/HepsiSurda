const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hepsisurda",
  password: "12354",
  port: 5432,
});

module.exports = pool;
