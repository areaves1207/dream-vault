const express = require('express');
const app = express();
app.use(cors());

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/user', userRoutes);

module.exports = app;
