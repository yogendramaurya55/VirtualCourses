import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
import cors from "cors"
import { authRouter } from "./route/auth.route.js";
import { userRouter } from "./route/user.route.js";

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 8000;

app.get("/status", (req , res)=>{
    
    console.log("server is ok")
    res.send("hello from server")

})

app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);

await connectDB();

app.listen(process.env.PORT || port , ()=>{
    console.log(`server started at port ${process.env.PORT}`)
})
