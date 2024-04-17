const db = require('./db'); // make sure this points to the file where you saved the pool code

async function testConnection() {
    try {
        const { rows } = await db.query('SELECT NOW()');
        console.log('Successful database connection. Current time:', rows[0].now);
    } catch (error) {
        console.error('Error testing the database connection:', error);
    }
}

testConnection();
