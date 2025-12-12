import { User } from "../model/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";


const signUp = async (req , res)=>{
    try {
        const {name , email , password  , role} = req.body;
        if(!name || !email  || !password || !role){
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            })
        }
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success: false,
                message: "enter valid email"
            })
        }

        if(email.length < 8){
            return res.status(400).json({
                success: false,
                message: "enter strong password"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);

        const newUser = await User.create({
            name,
            email,
            password : hashPassword,
            role

        })

        const token =  generateToken(newUser?._id);
        req.cookie("token",token , {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            success: true,
            newUser,
            message: "Account created successfully"

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `signup error : ${error}`
        })
    }
}

const login = async (req , res)=>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Missing Detail"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success: false,
                message: "user not found! Please signup first"
            })
        }

        
        const isPasswordCorrect = await bcrypt.compare(password , user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "wrong credentials"
            })
        }

    } catch (error) {
        
    }
}

export
{
    signUp
}