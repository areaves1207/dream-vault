const authModel = require('../models/authModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const register = await authModel.register(userData);

        return res.status(201).json(register).end();
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
        if(!user) return res.status(400).json({error: "Incorrect username or password.1"});

        //compare the two. if same, match is success, submitted info correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({error: "Incorrect username or password.2"});

        //issue token!!!!!! success
        const token = jwt.sign(
            { id: user.id, email: user.email }, //payload
            process.env.JWT_SECRET,             //sercret key
            { expiresIn: "1h" }                 //options
        );

        return res.status(200).json({
            message: "Login successful!",
            token: token,
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