const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Siva2001@',
    port: 5435,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
