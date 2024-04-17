const userService = require('../services/userService');



const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addUser = async (req, res) => {
    const { name, age, gender, occupation } = req.body;
    try {
        const newUser = await userService.addUser(name, age, gender, occupation);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, occupation } = req.body;
    try {
        const updatedUser = await userService.updateUser(id, name, age, gender, occupation);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
