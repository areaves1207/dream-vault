const authModel = require('../models/authModel');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/resend_sendEmail");

exports.register = async (req, res) => {
    try{    
        const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //validate email & pass
        if(!email_regex.test(req.body.email)){
            res.status(400).json({ error: "Invalid email" });
            return;
        }

        if(req.body.password.length < 8 || !(/[A-Z]/.test(req.body.password)) || !(/\d/.test(req.body.password))){
            res.status(400).json({ error: "Password must contain at least 8 characters. 1 capital, 1 number" });
            return;
        }

        //hash pass
        const salt = bcrypt.genSaltSync(10);
        const hashed_pass = bcrypt.hashSync(req.body.password, salt);

        const userData = {
            ...req.body,
            password: hashed_pass 
        }


        
        //insert user into DB
        let user = await authModel.getUserByEmail({ email: req.body.email });
        if(!user){
            //If user is not found, add them to db
            user = await authModel.register(userData);
            console.log("User added to DB");
        }else{
            //if the user exists, then we must check to see if theyre already verified
            if(user.verified){
                //user is verified, they shouldnt be registering again
                throw new Error("User is already verified. Please log in");
            }
        }

        //not a typo. our token is the 64 char hash of this, then the hash of THAT is stored in DB
        const verification_token = hash_verification_token(String(user.id) + String(user.email));

        //store time as UTC
        const expiresAt = new Date(Date.now() + 20 * 60 * 1000)
                            .toISOString()
                            .slice(0, 19)
                            .replace("T", " "); 
        console.log("Will expire at:", expiresAt, "aka: ",(Date.now() + 20 * 60 * 1000));

        const hashed_token = hash_verification_token(verification_token);
        const verificationUpdate = await authModel.addVerificationInfo(user.id, hashed_token, expiresAt);
        const token_id = verificationUpdate.verification_id;

        sendEmail.sendEmail(user.email, token_id, verification_token);


        return res.status(201).json({
            message: "User registered. Still requires email verification.",
            user: {
                id: user.id,
                email: user.email
            },
            verification: {
                id: verificationUpdate.verification_id
            }
        });
    }catch(err){
        console.log("Registration error: ", err);
        res.status(500).json({ error: err.message });
    }
}

exports.verify_email = async(req, res) => {
    console.log("Verify email reached");
    try{
        const token = req.body.token;
        
        if(!token){
            console.error("Token not found in url query. Attached is the token received:", token);
            throw new Error("Token not found in query");
        }

        const token_id = req.body.id;

        if(!token_id){
            console.error("TOKEN ID ERROR. ATTACHED IS THE ID:", token_id);
            throw new Error("URL query not found. Is it incorrect?");
        }

        //we store the hashed token in the user_verification table.
        // 1) hash the token that we have (the query we have from the url)
        // 2) check the db to see if that hash exists in there.
        // 3) on success, we get the token id, and maybe user id (to assign a jwt perhaps?)
        // 4) on success, we also must update the user's verifiation column to true, along with the column in user_verification *
        //      *ALSO TODO: maybe we can merge the two columns? I dont like having two columns in different tables to represent the same info. we need one source of truth.
        // 4) profit
        // 5) on failure, give the user an error (maybe time expired, query was wrong, dunno)
        
        const hashed_token = hash_verification_token(token);
        const token_info = await authModel.checkVerificationInfo(hashed_token, token_id);

        if(!token_info){
            console.error("TOKEN INFO MISSING:", token_info);
            throw new Error("TOKEN INFO MISSING");            
        }

        // const token_id = token_info[0].token_id;
        const user_id = token_info[0].user_id;
        const expiration_time = new Date(token_info[0].token_expires + "Z").getTime();

        if(Date.now() > expiration_time){
            console.error("Verificaiton token expired. Current time:", Date.now(), "...Expired at:", expiration_time);
            throw new Error("Verificaiton token expired. Current time:", Date.now(), "...Expired at:", expiration_time);
        }

        await authModel.verifyUser(user_id, token_id);

        //Give user jwt
        const user = await authModel.getUserByID(user_id);
        if(!user){
            console.error("Error getting user from ID");
            throw new Error("Error getting user from ID");
        }
        issueToken(user, res);

        return res.status(200).json({message: "Success"});
    }catch(error){
        console.log("Error in email verification:", error.message);
        return res.status(400).json({error: error.message});
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
        const token = req.cookies.jwt;

        if (!token) {
            console.error("Token not found");
            return res.status(401).json({ error: 'Token not found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

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
        { expiresIn: "30d" }                 //options
    ); 
    console.log("Token generated");

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 2592000, //expires in 30 days
        path: "/"
    });

    console.log("Token stored as cookie. Returning");
    return token;
}


function hash_verification_token(unhashed_token){
    const hash = crypto.createHash('sha256');
    const hashed_token = hash.update(unhashed_token).digest('hex'); //64 char string output
    return hashed_token;
}