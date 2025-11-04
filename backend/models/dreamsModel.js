const db = require('../config/db');

exports.getAll = async () => {
    const[rows] = await db.query('SELECT * FROM dreams');
    return rows;
};

exports.getDreamFromID = async(id) => {
    const[rows] = await db.query('SELECT * FROM dreams WHERE id=?', [id]);
    return rows[0];
}