const db = require('../db');

const getUsers = async () => {
    const { rows } = await db.query('SELECT * FROM users');
    return rows;
};

const getUserById = async (id) => {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
};

const addUser = async (name, age, gender, occupation) => {
    const { rows } = await db.query('INSERT INTO users (name, age, gender, occupation) VALUES ($1, $2, $3, $4) RETURNING *', [name, age, gender, occupation]);
    return rows[0];
};

const updateUser = async (id, name, age, gender, occupation) => {
    const { rows } = await db.query('UPDATE users SET name = $1, age = $2, gender = $3, occupation = $4 WHERE id = $5 RETURNING *', [name, age, gender, occupation, id]);
    return rows[0];
};

const deleteUser = async (id) => {
    const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
