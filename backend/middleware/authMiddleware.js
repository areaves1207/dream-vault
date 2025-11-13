const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(!token){
        return res.status(404).json({error: "Token not found"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({ error: "Invalid or expired token "});
        }
        req.user = decoded; //add it to the req for EVERYTHING later on (controller&module)
        console.log("Decoded token payload:", decoded);
        //Now we can always access the specific user with req.user.id
        next();
    });
}