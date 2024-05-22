const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: "",
  host: "localhost",
  port: 8000,
  database: "userauth",
});

module.exports = { pool };
