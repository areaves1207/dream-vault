const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dreamsRoutes = require('./routes/dreams');
app.use('/dreams', dreamsRoutes);

const authRoutes = require("./routes/authRoutes");
app.use('/routes', authRoutes);

module.exports = app;
