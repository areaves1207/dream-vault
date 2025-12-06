const express = require('express');
const app = express();
const cors = require('cors');
const {verifyToken} = require('./middleware/authMiddleware');
const cookieParser = require("cookie-parser");

const allowed_origins=[
    'http://dreamvault-frontend.s3-website-us-west-2.amazonaws.com',
    'https://dreamvault-frontend.s3-website-us-west-2.amazonaws.com',
    'https://dh1zsuurlerfc.cloudfront.net',
    'http://localhost:5173',
    'https://dreamvault.life',
    'https://www.dreamvault.life'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowed_origins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const dreamsRoutes = require('./routes/dreams');
app.use('/dreams', verifyToken, dreamsRoutes);

const authRoutes = require("./routes/authRoutes");
app.use('/routes', authRoutes);

module.exports = app;
