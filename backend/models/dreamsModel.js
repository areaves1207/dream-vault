const db = require('../config/db');
const { encrypt, decrypt } = require('../utils/encryption.ts');

exports.getAllDreamsFromUser = async (user_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE user_id =?',
        [user_id]
    );
    return rows;
};

exports.searchDreams = async(query, user_id) => {
    const [rows] = await db.query(
        'SELECT * FROM dreams WHERE user_id=? AND (TITLE LIKE ? OR DESCRIPTION LIKE ?) ORDER BY created_at DESC',
        [user_id, query, query]
    );
    return rows;
}

exports.getDreamFromID = async(dream_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE dream_id=?', [dream_id]);

    const dream = decryptDreamContent(rows[0]);
    return dream;    
}

exports.addDream = async(user_id, {title, description, date}) => {
    const d = new Date(date);
    const dateString = d.toISOString().split('T')[0];

    const encrypted_content = encrypt({title, description}); 
    const content = encrypted_content.encryptedData;
    const iv = encrypted_content.iv;
    const auth_tag = encrypted_content.auth_tag;

    const[result] = await db.query(
        `INSERT INTO dreams (user_id, dream_content, iv, auth_tag, date)
                                VALUES (?, ?, ?, ?, ?)`, 
        [user_id, content, iv, auth_tag, dateString]
    );

    return {
        dream_id: result.insertId
    };
}

exports.editDream = async(user_id, {dream_id, title, description, date}) => {
    const d = new Date(date);
    const dateString = d.toISOString().split('T')[0];

    const[result] = await db.query(
        'UPDATE dreams SET title=?, description=?, date=? WHERE dream_id=? AND user_id=?', 
        [title, description, dateString, dream_id, user_id]
    );

    return {
        dream_id, 
        title,
        description,
        date
    };
}

exports.deleteDream = async(user_id, {dream_id}) => {
    const[result] = await db.query(
        'DELETE FROM dreams WHERE dream_id=? AND user_id=?', 
        [dream_id, user_id]
    );

    return {dream_id};
}


//Used when SELECT * from dreams, or any query including: encrypted_data, iv, auth_tag, id, date
function decryptDreamContent(dream){
    const decrypted_dream = decrypt(
        dream.encrypted_data,
        dream.iv,
        dream.auth_tag
    );

    return {
        id: dream.id,
        title: decrypted_dream.title,
        description: decrypted_dream.description,
        date: dream.date
    };
}
