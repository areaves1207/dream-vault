const db = require('../config/db');

exports.getAll = async () => {
    const[rows] = await db.query('SELECT * FROM dreams');
    return rows;
};