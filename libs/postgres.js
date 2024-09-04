const { Client } = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'lucho',
    password: 'lucho',
    database: 'my_task'
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
