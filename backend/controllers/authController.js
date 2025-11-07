const authModel = require('../models/authModel');
const bcrypt = require("bcrypt");

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
        return res.status(201).json(register);
    }catch(err){
        console.log("AuthController Error: ", err);
        res.status(500).json({ error: err.message });
    }
}