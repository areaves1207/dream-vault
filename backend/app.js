const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const dreamsRoutes = require('./routes/dreams');
app.use('/dreams', dreamsRoutes);

module.exports = app;
