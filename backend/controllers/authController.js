const authModel = require('../models/authModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/ses_sendEmail");

exports.register = async (req, res) => {
    try{    
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //validate email & pass
        if(!email_regex.test(req.body.email)){
            res.status(400).json({ error: "Invalid email" });
            return;
        }

        if(req.body.password.length < 8 || !(/[A-Z]/.test(req.body.password)) || !(/\d/.test(req.body.password))){
            res.status(400).json({ error: "Password must contain at least 8, 1 capital, 1 number" });
            return;
        }

        //hash pass
        const salt = bcrypt.genSaltSync(10);
        const hashed_pass = bcrypt.hashSync(req.body.password, salt);

        const userData = {
            ...req.body,
            password: hashed_pass 
        }
        
        //insert into DB!!!!!!!!
        const user = await authModel.register(userData);
        console.log("User added to DB");

        // issueToken(user, res); //todo, replace token with emailing funciton. we dont want ot give token until verified.
        sendEmail.sendEmail("areaves@mines.edu");

        return res.status(201).json({
            message: "User registered. Still requires email verification.",
            user: {
                id: user.id,
                email: user.email
            }
        });
    }catch(err){
        console.log("AuthController Error: ", err);
        res.status(500).json({ error: err.message });
    }
}

exports.login = async (req, res) => {
    try{
        //attempt login
        email = req.body.email;
        
        //grab user's info from given email. make sure it returns something
        const user = await authModel.getUserByEmail(req.body);
        if(!user) return res.status(400).json({error: "Incorrect username or password."});

        //compare the two. if same, match is success, submitted info correct
        const isMatch = await bcrypt.compare(req.body.password, user.hashed_password);
        if(!isMatch) return res.status(400).json({error: "Incorrect username or password."});

        if(user.verified == false) return res.status(400).json({error: "User must verify account through email."});

        //issue token!!!!!! success
        issueToken(user, res);

        return res.status(200).json({
            message: "Login successful!",
            user: {
                id: user.id,
                email: user.email
            }
        });

    }catch(err){
        console.error("Login error: ", err)
        res.status(500).json({ error: err.message });
    }
}

exports.verify = async (req, res) => {
    try{
        console.log("Verifying token");
        const token = req.cookies.jwt;

        if (!token) {
            console.log("Token not found");
            return res.status(401).json({ error: 'Token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Token decoded");

        return res.status(200).json({
            success: true,
            message: 'Token validated',
            user: decoded,
        });

    }catch(err){
        console.error("JWT verification error: ", err)
        res.status(500).json({ error: err.message });
    }
}

exports.logout = async (req, res) =>{
    try{
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        return res.status(200).json({success: true, message: "Successfully logged out"});
    }catch(err){
        console.error("Logout error:", err);
        return res.status(500).json({ success: false, message: 'Logout failed' });
    }
}

exports.ping = async (req, res) =>{
    try{
        return res.status(200).json({success: true, message: "Ping! Success :)"});
    }catch(err){
        return res.status(500).json({ success: false, message: 'Failed to ping' });
    }
}

function issueToken(user, res){
    const token = jwt.sign(
        { id: user.id, email: user.email }, //payload
        process.env.JWT_SECRET,             //sercret key
        { expiresIn: "1h" }                 //options
    ); 
    console.log("Token generated");

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000,
        path: "/"
    });

    console.log("Token stored as cookie. Returning");
    return token;
}


function verifyEmail(user, res){
    sendEmail.sendEmail("areaves@mines.edu");
}