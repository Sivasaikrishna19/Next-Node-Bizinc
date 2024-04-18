const db = require('../db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');




const getUsers = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.error('Error during getUsers:', error);
        return null;
    }
};

const getUserById = async (id) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during getUserById:', error);
        return null;
    }
};

const addUser = async (name, age, gender, occupation) => {
    const id = uuid.v4();
    try {
        const { rows } = await db.query('INSERT INTO users (id, name, age, gender, occupation) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id, name, age, gender, occupation]);
        return rows[0];
    } catch (error) {
        console.error('Error during addUser:', error);
        return null;
    }
};

const updateUser = async (id, name, age, gender, occupation) => {
    try {
        const { rows } = await db.query('UPDATE users SET name = $1, age = $2, gender = $3, occupation = $4 WHERE id = $5 RETURNING *', [name, age, gender, occupation, id]);
        return rows[0];
    } catch (error) {
        console.error('Error during updateUser:', error);
        return null;
    }
};

const deleteUser = async (id) => {
    try {
        const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteUser:', error);
        return null;
    }
};
const addAdmin = async (email, password) => {
    const id = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const { rows } = await db.query(
            'INSERT INTO admins (id, email, password) VALUES ($1, $2, $3) RETURNING id, email',
            [id, email, hashedPassword]
        );
        return rows[0];
    } catch (error) {
        console.error('Error during addAdmin:', error);
        return null;
    }
};
const getAdminByEmail = async (email) => {
    try {
        const { rows } = await db.query(
            'SELECT id, email, password FROM admins WHERE email = $1',
            [email]
        );
        return rows[0] || null;
    } catch (error) {
        console.error('Error during getAdminByEmail:', error);
        return null;
    }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addAdmin,
    getAdminByEmail

};
