const { Pool, Client } = require('pg')
const knex = require('./knex');
// pools will use environment variables
// for connection information
// const pool = new Pool()
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()
// clients will also use environment variables
// for connection information
const launch = async () => {
    const client = new Client({
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PSWD,
        database: process.env.DEV_DB_NAME,
    });
    await client.connect()
    const query = `
CREATE TABLE test1 (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;
const query2 = `
INSERT INTO test1 (email, firstName, lastName, age)
VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
`;
    try {
        const res = await client.query(query);
    } catch (error) {
        console.log('error: ', error.message);
    }

    const res2 = await client.query(query2);
    const res3 = await client.query('SELECT * from test1;');
    console.log('res3: ', res3.rows);

    await client.end();
}

launch();