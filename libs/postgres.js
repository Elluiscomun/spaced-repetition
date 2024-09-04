const { Client } = require('pg');

/*
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
}*/

async function getConnection(){
  const client = new Client({
    host: 'dpg-crc5qdbqf0us73dim530-a.virginia-postgres.render.com',
    port: 5432,
    user: 'lucho',
    password: 'wy5REDFscs0F7XLepy1V3MfaO05wYJJE',
    database: 'my_task_p13y',
    ssl: {
      rejectUnauthorized: false
    }
  });

  await client.connect();

  return client;
}

module.exports = getConnection;
