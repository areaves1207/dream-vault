const express = require('express');
const app = express();
const cors = require('cors');
const {verifyToken} = require('./middleware/authMiddleware');
const cookieParser = require("cookie-parser");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const dreamsRoutes = require('./routes/dreams');
app.use('/dreams', verifyToken, dreamsRoutes);

const authRoutes = require("./routes/authRoutes");
app.use('/routes', authRoutes);

module.exports = app;
