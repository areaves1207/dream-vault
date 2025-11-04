const db = require('../config/db');

exports.getAll = async () => {
    const[rows] = await db.query('SELECT * FROM dreams');
    return rows;
};

exports.getDreamFromID = async(id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE id=?', [id]);
    return rows[0];
}

exports.addDream = async({title, description, date}) => {
    const d = new Date(date);
    const dateString = d.toISOString().split('T')[0];

    const[result] = await db.query(
        'INSERT INTO dreams (title, description, date) VALUES (?,?,?)', 
        [title, description, dateString]
    );

    return {
        id: result.insertId, 
        title,
        description,
        date
    };
}