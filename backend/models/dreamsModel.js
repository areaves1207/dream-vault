const db = require('../config/db');

exports.getAllDreamsFromUser = async (user_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE user_id =?',
        [user_id]
    );
    return rows;
};

exports.getDreamFromID = async(dream_id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE dream_id=?', [dream_id]);
    return rows[0];
}

exports.addDream = async(user_id, {title, description, date}) => {
    const d = new Date(date);
    const dateString = d.toISOString().split('T')[0];

    const[result] = await db.query(
        'INSERT INTO dreams (user_id, title, description, date) VALUES (?,?,?,?)', 
        [user_id, title, description, dateString]
    );

    return {
        dream_id: result.dream_id, 
        title,
        date
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
