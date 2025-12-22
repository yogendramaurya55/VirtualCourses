import express from "express"
import { login, logOut, signUp } from "../controller/auth.controller.js";

const userRouter = express.Router();

userRouter.post("/signup" , signUp);
userRouter.post("/login", login);
userRouter.get("/logout", logOut);


export
{
    userRouter
}