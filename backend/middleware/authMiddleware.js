//Auth Middlesware to protect routes
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(401).json({message: "No token provided" });

    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(401).json({error: "Token Missing"});

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err){
        return res.status(401).json({error : "Invalid token"})
    }
}