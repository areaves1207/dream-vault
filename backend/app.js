const express = require('express');
const app = express();

app.use(express.json());

const dreamsRoutes = require('./routes/dreams');
app.use('/dreams', dreamsRoutes);

module.exports = app;
