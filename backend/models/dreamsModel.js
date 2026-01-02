const db = require('../config/db');
const { encrypt, decrypt, tokenize, hashToken } = require('../utils/encryption.js');

exports.getAllDreamsFromUser = async (user_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE user_id =?',
        [user_id]
    );

    const dreams = decryptMultipleDreams(rows);
    return dreams;
};

exports.searchDreams = async(query, user_id) => {
    try{
        const tokens = tokenize(query);
        const hashes = tokens.map(hashToken);
        const token_count = hashes.length;

        if (hashes.length === 0) return [];

        const placeholders = hashes.map(() => "?").join(","); //add x number of '?'s depending on # of terms

        const [rows] = await db.query(
            `
            SELECT DISTINCT d.*
            FROM dreams d
            JOIN dream_search_index idx ON d.dream_id = idx.dream_id
            WHERE d.user_id = ?
                AND idx.token_hash IN (${placeholders})
            GROUP BY d.dream_id
            HAVING COUNT(DISTINCT idx.token_hash) = ?
            ORDER BY created_at
            `,
        [user_id, ...hashes, token_count]
        );

        dreams = decryptMultipleDreams(rows);

        return dreams;
    }catch(error){
        console.error("Error in searching dreams", error);
    }
}

exports.getDreamFromID = async(dream_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE dream_id=?', [dream_id]);

    const dream = decryptDreamContent(rows[0]);
    return dream;
}

exports.addDream = async(user_id, {title, description, date}) => {
    try{
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

        dream_id = await result.insertId;

        //add the hashed tokenized title + desc
        const tokens = tokenize(title + " " + description);
        const values = tokens.map(token => [dream_id, hashToken(token)]);

        await db.query(
            `INSERT INTO dream_search_index (dream_id, token_hash) VALUES ?`,
            [values]
        );


        return {
            dream_id: dream_id,
            title,
            description,
            date
        };
    }
    catch(error){
        console.error("Error adding dream:", error);
    }
}

exports.editDream = async(user_id, {dream_id, title, description, date}) => {
    const d = new Date(date);
    const dateString = d.toISOString().split('T')[0];

    const encrypted_content = encrypt({title, description}); 
    const content = encrypted_content.encryptedData;
    const iv = encrypted_content.iv;
    const auth_tag = encrypted_content.auth_tag;

    const[result] = await db.query(
        'UPDATE dreams SET dream_content=?, iv=?, auth_tag=?, date=? WHERE dream_id=? AND user_id=?', 
        [content, iv, auth_tag, dateString, dream_id, user_id]
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
    if (!dream.dream_content || !dream.iv || !dream.auth_tag) {
    //   console.warn(`Skipping unencrypted or incomplete dream. ID: ${dream.id}`);
      return;
    }

    const decrypted_dream = decrypt(
        dream.dream_content,
        dream.iv,
        dream.auth_tag
    );

    return {
        dream_id: dream.dream_id,
        title: decrypted_dream.title,
        description: decrypted_dream.description,
        date: dream.date
    };
}

function decryptMultipleDreams(dreams) {
  return dreams.map(dream => decryptDreamContent(dream)).filter(Boolean);
}
