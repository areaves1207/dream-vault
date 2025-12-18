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

exports.addVerificationInfo = async(user_id, verification_hash, expirationTime) => {
    const [result] = await db.query(
        'INSERT INTO user_verification (user_id, token, token_expires) VALUES (?, ?, ?)',
        [user_id, verification_hash, expirationTime]
    );

    return{
        verification_id: result.insertId,
        user_id
    }
}

exports.checkVerificationInfo = async(token, id) => {
    const [result] = await db.query(
        'SELECT user_id, token_id, token_expires FROM user_verification WHERE token=? AND token_id=?',
        [token, id]
    )

    return result;
}

exports.verifyUser = async(user_id, token_id) => {
    const [result] = await db.query(
        'UPDATE users SET verified=TRUE WHERE id=?',
        [user_id]
    );
    const [r] = await db.query(
        'UPDATE user_verification SET token_verified=TRUE WHERE token_id=?',
        [token_id]
    );
}

exports.getUserByEmail = async ({email}) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email=?',
        [email]
    );
    return rows[0];
}

exports.getUserByID = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE id=?',
        [id]
    );
    return rows[0];
}