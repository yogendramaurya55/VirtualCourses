import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const isAuth = async (req , res , next)=>{

    try {
        const token = req.cookies?.token ;

    if(!token){
        return res.status(400).json({
            success:false,
            message:`unauthorized user`
        })
    }

    const verifyToken = await jwt.verify(token , process.env.JWT_SECRET);

    if(!verifyToken){
        return res.status(400).json({
            success:false,
            message:"invalid token"
        })
    }

    const user = await User.findById(verifyToken.userId).select("-password");

    if(!user){
        return res.status(401).json({
            success:false,
            message:"invalid access token"
        })
    }

    req.userId = verifyToken.userId;

    next()

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`isAuth error : ${error}`
        })
    }
}

export 
{
    isAuth
}