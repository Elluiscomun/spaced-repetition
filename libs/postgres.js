const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.NAME_DB,
    ssl: {
      rejectUnauthorized: false
    }
  });


  await client.connect();

  return client;
}

module.exports = getConnection;
