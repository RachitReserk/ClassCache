import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const authenticateToken = (req,res,next) => {
{/*const authHeader = req.headers["authorization"]
const token = authHeader && authHeader.split("EVA01 ")[1];*/}

{/*if(token == null){
    res.status(401).json({message:"Authentication token required"})
}*/}

const token = req.cookies.token;
if (!token) return res.status(403).json({ message: 'No token provided' });

jwt.verify(token,process.env.KEY,(err , user)=>{
    if(err){
        return res.status(403).json(err)
    }
    req.user = user
    next()
})
}

export default authenticateToken

