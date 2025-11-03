// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
require('dotenv').config();

// Define a route
router.get('/', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
});


router.get('/101', async(req,res) =>
    res.send(`hello!`)
);

// export the router module so that server.js file can use it
module.exports = router;