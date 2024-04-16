const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_postgresql_username',
    host: 'localhost',
    database: 'mydatabase',
    password: 'your_postgresql_password',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
