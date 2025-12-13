import express from "express"
import { signUp } from "../controller/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/signup" , signUp);


export
{
    userRouter
}