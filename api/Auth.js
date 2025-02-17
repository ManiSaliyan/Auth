import jwt from "jsonwebtoken";
const ensureAuthozized = (req,res,next)=>{
    const auth = req.headers("authorization");
    if(!auth){
        return res.status(403).json({message: "Unauthorized, JWT Token Required"})
    }
    try{
        const decoded = jwt.verify(auth,process.env.JWT_SEC)
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403).json({message: "Unauthorized, JWT Token isExpired"})
    }
}
module.exports = ensureAuthozized;