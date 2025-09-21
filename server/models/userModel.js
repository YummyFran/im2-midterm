const db = require('../config/db');

const createUser = async (uuid, name, email, passwordHash) => {
    const result = await db.query(
        'INSERT INTO users (uid, name, email, password) VALUES (?, ?, ?, ?)',
        [uuid, name, email, passwordHash]
    )   

    console.log(result)

    return { uid: uuid, name, email };
}

const getUserByEmail = async (email) => {
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    return rows[0];
}

const getUserById = async (uid) => {
    if (!uid) return null

    const [rows] = await db.query('SELECT * FROM users WHERE uid = ?', [uid]);
    return rows[0];
}

const getUsers = async ({ limit, offset }) => {
    const [users] = await db.query('SELECT *, COUNT(*) OVER() AS total_count FROM users ORDER BY status LIMIT ? OFFSET ?', 
        [Number(limit), Number(offset)]
    );

    return users
}

module.exports = { 
    createUser, 
    getUserByEmail, 
    getUserById, 
    getUsers 
};
