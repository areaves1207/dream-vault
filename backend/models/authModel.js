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

exports.addVerificationInfo = async(user_id, verification_hash) => {
    //TODO ADD EXPIRATION DATE/TIME
    const [result] = await db.query(
        'INSERT INTO user_verification (user_id, token) VALUES (?, ?)',
        [user_id, verification_hash]
    );

    return{
        verification_id: result.token_id,
        user_id
    }
}

exports.checkVerificationInfo = async(token) => {
    const [result] = await db.query(
        'SELECT user_id, token_id FROM user_verification WHERE token=?',
        [token]
    )

    return result;
}

exports.verifyUser = async(user_id) => {
    const [result] = await db.query(
        'UPDATE users SET verified=TRUE WHERE id=?',
        [user_id]
    );
    //TODO WE NEED TO UPDATE VERIFIED IN THE users_verification FIELD
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