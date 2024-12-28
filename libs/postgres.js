const { Pool } = require('pg');

async function getConnection(){
  const pool = new Pool({
    host: process.env.HOST_DBB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    ssl: {
      rejectUnauthorized: false
    }
  });


  //await client.connect();
  const client = await pool.connect();

  return client;
}

module.exports = getConnection;
