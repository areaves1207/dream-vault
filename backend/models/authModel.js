const db = require('../config/db');

exports.register = async ({email, password}) => {
    const [result] = await db.query(
        'INSERT INTO users(email, hashed_password) VALUES (?, ?)',
        [email, password]
    );

    return{
        id: result.insertId,
        email
    }
}

exports.getUserByEmail = async ({email}) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email=?',
        [email]
    );
    return rows[0];
}