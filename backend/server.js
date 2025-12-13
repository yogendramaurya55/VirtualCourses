import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
import { userRouter } from "./route/user.route.js";
import cors from "cors"

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 8000;

app.get("/status", (req , res)=>{
    
    console.log("server is ok")
    res.send("hello from server")

})

app.use("/api/auth" , userRouter);

await connectDB();

app.listen(process.env.PORT || port , ()=>{
    console.log(`server started at port ${process.env.PORT}`)
})
