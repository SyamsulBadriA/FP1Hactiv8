const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "final_project1",
  password: "151200",
  port: 5432,
});

module.exports = pool;
